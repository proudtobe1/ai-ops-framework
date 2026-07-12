import sys
import os
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'validators'))
from vector_drift import VectorDriftVerifier


def test_vector_drift_stable_distribution():
    """
    Verifies that semantically similar embedding distributions produce
    a high cosine similarity score and do not trigger the drift alert.
    """
    dimensions = 512
    baseline = [list(np.random.normal(0.5, 0.01, dimensions)) for _ in range(3)]
    current = [list(np.random.normal(0.5, 0.005, dimensions)) for _ in range(3)]
    similarity, drifted, metrics = VectorDriftVerifier.analyze_semantic_drift(
        baseline_embeddings=baseline,
        current_embeddings=current,
        alert_threshold=0.85
    )
    assert similarity > 0.90
    assert drifted is False
    assert "centroid_distance" in metrics
    assert metrics["baseline_variance"] > 0


def test_vector_drift_drifting_distribution():
    """
    Verifies that a distinct topological translation between distribution centers
    properly fires the boolean drift alert system.
    """
    dimensions = 512
    baseline = [[1.0 if i == 0 else 0.0 for i in range(dimensions)] for _ in range(3)]
    current = [[1.0 if i == 100 else 0.0 for i in range(dimensions)] for _ in range(3)]
    similarity, drifted, metrics = VectorDriftVerifier.analyze_semantic_drift(
        baseline_embeddings=baseline,
        current_embeddings=current,
        alert_threshold=0.75
    )
    assert similarity < 0.10
    assert drifted is True
    assert "centroid_distance" in metrics


def test_vector_drift_empty_embeddings_raises():
    """
    Verifies that empty embedding lists raise a ValueError
    instead of producing a silent NaN result.
    """
    try:
        VectorDriftVerifier.analyze_semantic_drift(
            baseline_embeddings=[],
            current_embeddings=[],
            alert_threshold=0.75
        )
        assert False, "Expected ValueError was not raised"
    except ValueError as exc:
        assert "must not be empty" in str(exc).lower()
