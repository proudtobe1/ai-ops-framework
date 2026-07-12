import numpy as np
from typing import Any, Dict, List, Tuple


class SeedStabilityVerifier:
    """
    Monitors output variance under fixed system seeds to capture systemic non-determinism.
    """

    @staticmethod
    def calculate_variance_threshold(scores: List[float]) -> float:
        """
        Computes the statistical variance of multi-turn validation metrics.
        """
        if 2 > len(scores):
            return 0.0
        return float(np.var(scores))

    @classmethod
    def verify_metric_stability(
        cls,
        run_scores: List[float],
        variance_tolerance: float = 0.02,
    ) -> Tuple[float, bool, Dict[str, Any]]:
        """
        Evaluates run scores across identical iterations to ensure stability.

        Returns:
            Tuple containing:
            - metric_variance (float): Statistical variance across runs.
            - unstable_detected (bool): True if variance exceeds tolerance.
            - stability_metadata (Dict): Variance, range, std deviation log.
        """
        data_points = np.array(run_scores)
        metric_variance = cls.calculate_variance_threshold(run_scores)
        unstable_detected = metric_variance > variance_tolerance
        stability_metadata = {
            "calculated_variance": metric_variance,
            "standard_deviation": float(np.std(data_points)),
            "score_range": float(np.max(data_points) - np.min(data_points)),
            "iteration_count": len(run_scores),
            "variance_tolerance_limit": variance_tolerance,
        }
        return metric_variance, unstable_detected, stability_metadata
