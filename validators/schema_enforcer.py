import json
from typing import Dict, Any, Optional, Tuple
from pydantic import BaseModel, ValidationError

class SchemaEnforcer:
    """
    Validates, parses, and logs structural alignment of LLM outputs 
    against strict Pydantic schemas to prevent upstream application drift.
    """
    
    @staticmethod
    def clean_llm_json(raw_output: str) -> str:
        """
        Strips common LLM formatting artifacts like markdown block wrappers 
        (e.g., ```json ... ```) to isolate the raw JSON payload.
        """
        cleaned = raw_output.strip()
        if cleaned.startswith("```"):
            # Split lines and drop the first line if it contains the language tag
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
        target_schema: type[BaseModel]
    ) -> Tuple[bool, Optional[BaseModel], Dict[str, Any]]:
        """
        Enforces structural validation on raw LLM string data.
        
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
            "validation_errors": []
        }

        # Step 1: Validate baseline JSON compliance
        try:
            parsed_dict = json.loads(cleaned_json)
        except json.JSONDecodeError as je:
            error_metadata["parse_error"] = f"Invalid JSON syntax: {str(je)}"
            return False, None, error_metadata

        # Step 2: Enforce the Pydantic structural schema
        try:
            validated_obj = target_schema.model_validate(parsed_dict)
            return True, validated_obj, error_metadata
        except ValidationError as ve:
            # Capture exact structural anomalies (missing keys, wrong types)
            error_metadata["validation_errors"] = ve.errors()
            return False, None, error_metadata
