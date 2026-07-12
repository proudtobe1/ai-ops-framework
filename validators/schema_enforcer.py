import json
from pathlib import Path
from typing import Any, Dict, Optional, Tuple, Type

import jsonschema
from pydantic import BaseModel, ValidationError


class SchemaEnforcer:
    """
    Dual-gate output validator for AI-Ops pipeline artifacts.

    Gate 1 — JSON Schema (Draft-07): enforces field presence, formats,
              enum constraints, and additionalProperties rules.
    Gate 2 — Pydantic:              enforces Python-side type coercion
              and structural model correctness.

    Usage:
        ok, model, meta = SchemaEnforcer.validate_output(raw, MyModel)
    """

    _DEFAULT_JSON_SCHEMA: Path = (
        Path(__file__).parent
        / "schemas"
        / "ai-ops-validators-schema-metric-update.json"
    )

    @classmethod
    def _load_json_schema(cls, schema_path: Optional[Path] = None) -> Dict[str, Any]:
        """
        Loads and returns the JSON Schema (Draft-07) from disk.
        Defaults to the bundled ai-ops-validators-schema-metric-update.json.
        """
        path = schema_path or cls._DEFAULT_JSON_SCHEMA
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)

    @staticmethod
    def clean_llm_json(raw_output: str) -> str:
        """
        Strips common LLM formatting artifacts like markdown block wrappers
        (e.g., ```json ... ```) to isolate the raw JSON payload.
        """
        cleaned = raw_output.strip()
        if cleaned.startswith("```"):
            lines = cleaned.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            cleaned = "\n".join(lines).strip()
        return cleaned

    @classmethod
    def validate_output(
        cls,
        raw_output: str,
        target_schema: Type[BaseModel],
        json_schema_path: Optional[Path] = None,
    ) -> Tuple[bool, Optional[BaseModel], Dict[str, Any]]:
        """
        Dual-gate validation: JSON Schema (Draft-07) then Pydantic structural schema.

        Gate 1 - jsonschema: enforces field presence, formats, enum constraints,
                 and additionalProperties rules defined in the JSON Schema file.
        Gate 2 - Pydantic:   enforces Python-side type coercion and model structure.

        Returns:
            (True,  model_instance, {})           on full pass
            (False, None,           error_metadata) on any failure

        error_metadata keys:
            'json_parse_error'   — raw string was not valid JSON
            'schema_error'       — failed JSON Schema (Draft-07) validation
            'pydantic_error'     — failed Pydantic model validation
        """
        error_metadata: Dict[str, Any] = {}

        # --- Stage 1: Parse raw JSON ---
        try:
            cleaned = cls.clean_llm_json(raw_output)
            parsed = json.loads(cleaned)
        except json.JSONDecodeError as exc:
            error_metadata["json_parse_error"] = str(exc)
            return False, None, error_metadata

        # --- Stage 2: JSON Schema (Draft-07) validation ---
        try:
            json_schema = cls._load_json_schema(json_schema_path)
            jsonschema.validate(instance=parsed, schema=json_schema)
        except jsonschema.ValidationError as exc:
            error_metadata["schema_error"] = exc.message
            return False, None, error_metadata
        except jsonschema.SchemaError as exc:
            error_metadata["schema_error"] = f"Malformed schema: {exc.message}"
            return False, None, error_metadata

        # --- Stage 3: Pydantic structural validation ---
        try:
            model_instance = target_schema.model_validate(parsed)
        except ValidationError as exc:
            error_metadata["pydantic_error"] = exc.errors()
            return False, None, error_metadata

        return True, model_instance, {}
