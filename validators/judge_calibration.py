import numpy as np
from typing import List, Dict, Any, Tuple

class JudgeCalibrationEngine:
    """
    Validates the reliability of LLM-as-a-Judge outputs by measuring calibration
    against gold-standard baseline scores and evaluating rubric adherence.
    """

    @staticmethod
    def calculate_calibration_error(
        judge_scores: List[float],
        baseline_scores: List[float]
    ) -> float:
        """
        Computes the Mean Absolute Error (MAE) between the judge's predictions 
        and the established human or gold-standard baseline.
        """
        if not judge_scores or not baseline_scores or len(judge_scores) != len(baseline_scores):
            raise ValueError("Score lists must be populated and of equal length.")
        
        return float(np.mean(np.abs(np.array(judge_scores) - np.array(baseline_scores))))

    @classmethod
    def verify_judge_reliability(
        cls,
        judge_scores: List[float],
        baseline_scores: List[float],
        error_tolerance: float = 0.15
    ) -> Tuple[float, bool, Dict[str, Any]]:
        """
        Evaluates if the LLM judge's scoring drift exceeds acceptable calibration limits.

        Returns:
            Tuple containing:
            - calibration_error (float): The calculated MAE.
            - recalibration_required (bool): Flag indicating if the judge has drifted.
            - calibration_metadata (Dict): Concrete data logging the error and variance.
        """
        calibration_error = cls.calculate_calibration_error(judge_scores, baseline_scores)
        
        # Calibration breach occurs if the judge deviates too far from the baseline
        recalibration_required = calibration_error > error_tolerance

        calibration_metadata = {
            "mean_absolute_error": calibration_error,
            "max_deviation": float(np.max(np.abs(np.array(judge_scores) - np.array(baseline_scores)))),
            "sample_size": len(judge_scores),
            "error_tolerance_limit": error_tolerance
        }

        return calibration_error, recalibration_required, calibration_metadata
