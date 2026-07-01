import numpy as np
from typing import List, Dict, Any, Tuple
class SeedStabilityVerifier:
"""
Validates framework metric consistency by measuring multi-turn output variance
under fixed system seeds to capture systemic non-determinism.
"""
@staticmethod
def calculate_variance_threshold(scores: List[float]) -> float:
"""
Computes the statistical variance of multi-turn validation metrics.
"""
if len(scores) < 2:
return 0.0
return float(np.var(scores))
@classmethod
def verify_metric_stability(
cls,
run_scores: List[float],
variance_tolerance: float = 0.02
) -> Tuple[float, bool, Dict[str, Any]]:
"""
Evaluates run scores across identical iterations to ensure stability bounds.
Returns:
Tuple containing:
- metric_variance (float): The calculated statistical variance across runs.
- unstable_detected (bool): Boolean trigger firing if variance exceeds bounds.
- stability_metadata (Dict): Concrete data logging variance, range, and standard deviation.
"""
data_points = np.array(run_scores)
metric_variance = cls.calculate_variance_threshold(run_scores)
# Stability breach occurs if metrics shift too radically across identical runs
unstable_detected = metric_variance > variance_tolerance
stability_metadata = {
"calculated_variance": metric_variance,
"standard_deviation": float(np.std(data_points)),
"score_range": float(np.max(data_points) - np.min(data_points)),
"iteration_count": len(run_scores),
"variance_tolerance_limit": variance_tolerance
}
return metric_variance, unstable_detected, stability_metadata
