import pytest
from validators.judge_calibration import JudgeCalibrationEngine

def test_calculate_calibration_error_accurate_match():
    """
    Asserts that identical baseline and judge scores produce an MAE of 0.0.
    """
    baseline = [0.9, 0.8, 0.7]
    judge = [0.9, 0.8, 0.7]
    
    error = JudgeCalibrationEngine.calculate_calibration_error(judge, baseline)
    assert error == 0.0

def test_verify_judge_reliability_detects_drift():
    """
    Asserts that the reliability engine correctly flags a calibration breach
    when the judge scores exceed the allowed error tolerance.
    """
    baseline = [1.0, 0.9, 0.8]
    judge = [0.5, 0.4, 0.3]
    
    # Expected MAE is 0.5, which exceeds a 0.10 tolerance
    error, is_drifted, metadata = JudgeCalibrationEngine.verify_judge_reliability(
        judge_scores=judge,
        baseline_scores=baseline,
        error_tolerance=0.10
    )
    
    assert error == 0.5
    assert is_drifted is True
    assert metadata["error_tolerance_limit"] == 0.10

def test_verify_judge_reliability_passes_within_tolerance():
    """
    Asserts that minor variations within the tolerance window do not trigger a drift alert.
    """
    baseline = [0.80, 0.75]
    judge = [0.82, 0.73] 
    
    # Variations are 0.02 and 0.02, MAE is ~0.02, well within 0.10 tolerance
    error, is_drifted, metadata = JudgeCalibrationEngine.verify_judge_reliability(
        judge_scores=judge,
        baseline_scores=baseline,
        error_tolerance=0.10
    )
    
    assert error == pytest.approx(0.02, rel=1e-5)
    assert is_drifted is False

def test_calculate_calibration_error_raises_value_error_on_mismatch():
    """
    Asserts that the system immediately fails and raises a ValueError if the
    number of judge evaluations does not match the baseline sample size.
    """
    baseline = [0.9, 0.8]
    judge = [0.9]
    
    with pytest.raises(ValueError):
        JudgeCalibrationEngine.calculate_calibration_error(judge, baseline)
