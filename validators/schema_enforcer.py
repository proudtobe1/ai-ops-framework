import json
import jsonschema
from pathlib import Path
from typing import Dict, Any, Optional, Tuple
from pydantic import BaseModel, ValidationError

class SchemaEnforcer:
    """
    Validates, parses, and logs structural alignment of LLM outputs 
    against strict Pydantic schemas to prevent upstream application drift.
    """

    _DEFAULT_JSON_SCHEMA: Path = (
        Path(__file__).parent / "schemas" / "ai-ops-validators-schema-metric-update.json"
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
        target_schema: type[BaseModel],
        json_schema_path: Optional[Path] = None
    ) -> Tuple[bool, Optional[BaseModel], Dict[str, Any]]:
        """
        Dual-gate validation: JSON Schema (Draft-07) then Pydantic structural schema.

        Gate 1 - jsonschema: enforces field presence, formats, enum constraints,
                  and additionalProperties rules defined in the JSON Schema file.
        Gate 2 - Pydantic:   enforces Python-side type coercion and model structure.

        Returns:
            Tuple containing:
            - is_valid (bool)
            - parsed_object (Optional[BaseModel]): Validated Pydantic instance if successful.
            - error_metadata (Dict[str, Any]): Structural delta or drift logging data.
        """
        cleaned_json = cls.clean_llm_json(raw_output)
        error_metadata = {
            "raw_length": len(raw_output),
            "parse_error": None,
            "json_schema_errors": [],
            "validation_errors": []
        }

        # Step 1: Validate baseline JSON compliance
        try:
            parsed_dict = json.loads(cleaned_json)
        except json.JSONDecodeError as je:
            error_metadata["parse_error"] = f"Invalid JSON syntax: {str(je)}"
            return False, None, error_metadata

        # Step 2: JSON Schema (Draft-07) gate - structural and semantic constraints
        try:
            json_schema = cls._load_json_schema(json_schema_path)
            jsonschema.validate(instance=parsed_dict, schema=json_schema)
        except jsonschema.ValidationError as jve:
            error_metadata["json_schema_errors"] = [jve.message]
            return False, None, error_metadata
        except jsonschema.SchemaError as jse:
            error_metadata["json_schema_errors"] = [f"Schema load error: {jse.message}"]
            return False, None, error_metadata
        except OSError as oe:
            error_metadata["json_schema_errors"] = [f"Schema file unavailable: {str(oe)}"]
            return False, None, error_metadata

        # Step 3: Enforce the Pydantic structural schema
        try:
            validated_obj = target_schema.model_validate(parsed_dict)
            return True, validated_obj, error_metadata
        except ValidationError as ve:
            error_metadata["validation_errors"] = ve.errors()
            return False, None, error_metadata
