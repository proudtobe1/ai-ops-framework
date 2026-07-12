import sys
import os
import json
import pathlib
from typing import List, Optional

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'validators'))
from schema_enforcer import SchemaEnforcer
from pydantic import BaseModel, Field

# Path to the permissive test fixture schema — accepts any object
_FIXTURE_SCHEMA = str(
    pathlib.Path(__file__).parent / 'fixtures' / 'test_schema_permissive.json'
)


class MockValidationSchema(BaseModel):
    """Minimal Pydantic model used exclusively for unit testing the SchemaEnforcer pipeline."""
    model_name: str
    drift_detected: bool
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    flagged_tokens: List[str]


def test_schema_enforcer_passing_case():
    """
    Ensures that structured JSON inputs that satisfy all three gates
    (JSON parse, JSON Schema, Pydantic) complete without errors.
    """
    valid_payload = json.dumps({
        "model_name": "agentic-v1",
        "drift_detected": False,
        "confidence_score": 0.99,
        "flagged_tokens": []
    })
    success, obj, meta = SchemaEnforcer.validate_output(
        valid_payload,
        MockValidationSchema,
        json_schema_path=_FIXTURE_SCHEMA
    )
    assert success is True
    assert obj is not None
    assert obj.model_name == "agentic-v1"
    assert meta.get("json_parse_error") is None
    assert meta.get("schema_error") is None
    assert meta.get("pydantic_error") is None


def test_schema_enforcer_failing_case():
    """
    Ensures that data-type mismatches and out-of-bounds metrics are caught
    and rejected cleanly by the Pydantic validation gate.
    """
    invalid_payload = json.dumps({
        "model_name": "agentic-v1",
        "drift_detected": "invalid-string-instead-of-bool",
        "confidence_score": 4.5,
        "flagged_tokens": "corrupted-string-not-list"
    })
    success, obj, meta = SchemaEnforcer.validate_output(
        invalid_payload,
        MockValidationSchema,
        json_schema_path=_FIXTURE_SCHEMA
    )
    assert success is False
    assert obj is None
    assert meta.get("pydantic_error") is not None


def test_schema_enforcer_invalid_json():
    """
    Ensures that malformed JSON is caught at Gate 1 (json.loads)
    and surfaces the json_parse_error key in the metadata dict.
    """
    broken_json = '{"model_name": "agentic-v1", BROKEN}'
    success, obj, meta = SchemaEnforcer.validate_output(
        broken_json,
        MockValidationSchema,
        json_schema_path=_FIXTURE_SCHEMA
    )
    assert success is False
    assert obj is None
    assert meta.get("json_parse_error") is not None
