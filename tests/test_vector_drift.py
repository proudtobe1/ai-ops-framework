import pytest
import numpy as np
from validators.vector_drift import VectorDriftVerifier
def test_vector_drift_stable_distribution():
"""
Verifies that highly stationary and identical embedding distributions
yield high similarity scores and do not trigger drift alerts.
"""
np.random.seed(100)
dimensions = 512
# Generate tightly clustered stationary datasets
baseline = [list(np.random.normal(0.2, 0.005, dimensions)) for _ in range(5)]
current = [list(np.random.normal(0.2, 0.005, dimensions)) for _ in range(3)]
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
# Force absolute mathematical separation between the matrix centers
baseline = [[1.0 if i == 0 else 0.0 for i in range(dimensions)] for _ in range(3)]
current = [[1.0 if i == 100 else 0.0 for i in range(dimensions)] for _ in range(3)]
similarity, drifted, metrics = VectorDriftVerifier.analyze_semantic_drift(
baseline_embeddings=baseline,
current_embeddings=current,
alert_threshold=0.85
)
assert similarity < 0.10
assert drifted is True
assert metrics["centroid_distance"] > 0.0
