import sys
import os
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'validators'))
from seed_stability import SeedStabilityVerifier


def test_seed_stability_acceptable_variance():
    """
    Asserts that five tightly grouped multi-turn execution scores
    produce a variance well below the tolerance threshold.
    """
    stable_scores = [0.95, 0.94, 0.95, 0.94, 0.95]
    tolerance = 0.01
    variance, unstable, logs = SeedStabilityVerifier.verify_metric_stability(
        run_scores=stable_scores,
        variance_tolerance=tolerance
    )
    assert unstable is False
    assert variance < tolerance
    assert logs["iteration_count"] == 5
    assert logs["score_range"] == pytest.approx(0.01, abs=1e-5)


def test_seed_stability_exceeded_variance():
    """
    Asserts that highly volatile multi-turn execution scores
    successfully trigger the instability flag when crossing limits.
    """
    volatile_scores = [0.95, 0.32, 0.88, 0.12, 0.99]
    tolerance = 0.01
    variance, unstable, logs = SeedStabilityVerifier.verify_metric_stability(
        run_scores=volatile_scores,
        variance_tolerance=tolerance
    )
    assert unstable is True
    assert variance > tolerance
    assert logs["standard_deviation"] > 0.0
    assert logs["score_range"] == pytest.approx(0.87, abs=1e-5)


def test_seed_stability_insufficient_data():
    """
    Asserts that running less than two iterations gracefully resolves
    to a variance of zero and flags no instability issues.
    """
    insufficient_scores = [0.95]
    variance, unstable, logs = SeedStabilityVerifier.verify_metric_stability(
        run_scores=insufficient_scores,
        variance_tolerance=0.01
    )
    assert variance == 0.0
    assert unstable is False
    assert logs["iteration_count"] == 1
