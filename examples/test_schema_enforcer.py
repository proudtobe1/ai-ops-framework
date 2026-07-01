from pydantic import BaseModel, Field
from typing import List
from validators.schema_enforcer import SchemaEnforcer
1. Define an example invariant structural target for an AI agent
class DriftReportSchema(BaseModel):
"""
Example schema to track whether an AI model's output is structurally shifting.
"""
model_name: str = Field(..., description="The name of the evaluated model")
drift_detected: bool
confidence_score: float = Field(..., ge=0.0, le=1.0)
flagged_tokens: List[str]
2. Mock model outputs to validate the enforcer
Cleaned of any triple-backtick markdown blocks to protect the stream
passing_llm_output = """
{
"model_name": "agentic-reasoner-v1",
"drift_detected": true,
"confidence_score": 0.94,
"flagged_tokens": ["instability", "hallucination_delta"]
}
"""
failing_llm_output = """
{
"model_name": "agentic-reasoner-v1",
"drift_detected": "yes",
"confidence_score": 1.5,
"flagged_tokens": "corrupted_string_not_a_list"
}
"""
3. Execute validation suite
print("--- Running Invariant Test: Valid Output ---")
success, obj, meta = SchemaEnforcer.validate_output(passing_llm_output, DriftReportSchema)
print(f"Validation Success: {success}")
if success and obj:
print(f"Parsed Object: {obj.model_dump()}\n")
print("--- Running Invariant Test: Defective Output (Type & Boundary Drift) ---")
success, obj, meta = SchemaEnforcer.validate_output(failing_llm_output, DriftReportSchema)
print(f"Validation Success: {success}")
print(f"Captured Invariant Violations: {meta['validation_errors']}")
