import pytest
from pydantic import BaseModel, Field
from typing import List
from validators.schema_enforcer import SchemaEnforcer
class MockValidationSchema(BaseModel):
"""
Automated testing target schema to verify structural compliance logic.
"""
model_name: str
drift_detected: bool
confidence_score: float = Field(..., ge=0.0, le=1.0)
flagged_tokens: List[str]
def test_schema_enforcer_passing_case():
"""
Ensures that structured JSON inputs parse perfectly without errors.
"""
valid_payload = """
{
"model_name": "agentic-v1",
"drift_detected": false,
"confidence_score": 0.99,
"flagged_tokens": []
}
"""
success, obj, meta = SchemaEnforcer.validate_output(valid_payload, MockValidationSchema)
assert success is True
assert obj is not None
assert obj.model_name == "agentic-v1"
assert meta["parse_error"] is None
def test_schema_enforcer_failing_case():
"""
Ensures that data-type mismatches and out-of-bounds metrics are rejected.
"""
invalid_payload = """
{
"model_name": "agentic-v1",
"drift_detected": "invalid-string-instead-of-bool",
"confidence_score": 4.5,
"flagged_tokens": "corrupted-string-not-list"
}
"""
success, obj, meta = SchemaEnforcer.validate_output(invalid_payload, MockValidationSchema)
assert success is False
assert obj is None
assert len(meta["validation_errors"]) > 0
