import json
from validators.judge_calibration import JudgeCalibrationEngine

print("--- Scenario: Validating LLM-as-a-Judge Calibration ---")

# 1. Mock baseline human/gold-standard scores (e.g., alignment scores from 0.0 to 1.0)
baseline_human_scores = [0.95, 0.80, 0.45, 0.90, 0.60]

# 2. Mock LLM judge scores on the same exact data
llm_judge_scores = [0.92, 0.78, 0.60, 0.88, 0.55]

# 3. Evaluate the calibration drift with a strict 0.10 tolerance
calibration_error, is_drifted, metadata = JudgeCalibrationEngine.verify_judge_reliability(
    judge_scores=llm_judge_scores,
    baseline_scores=baseline_human_scores,
    error_tolerance=0.10
)

print("\nCalibration Results:")
print(f"Mean Absolute Error (MAE): {calibration_error:.4f}")
print(f"Recalibration Required (Drifted): {is_drifted}")

print("\nDetailed Metadata Snapshot:")
print(json.dumps(metadata, indent=4))
