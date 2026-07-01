from pydantic import BaseModel, Field
from typing import List
from validators.schema_enforcer import SchemaEnforcer

# 1. Define an example invariant structural target for an AI agent
class DriftReportSchema(BaseModel):
    model_name: str = Field(..., description="The name of the evaluated model")
    drift_detected: bool
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    flagged_tokens: List[str]

# 2. Mock model outputs to validate the enforcer
passing_llm_output = """
```json
{
    "model_name": "agentic-reasoner-v1",
    "drift_detected": true,
    "confidence_score": 0.94,
    "flagged_tokens": ["instability", "hallucination_delta"]
}
