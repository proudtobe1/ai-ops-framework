import numpy as np
from typing import Any, Dict, List, Tuple


class VectorDriftVerifier:
    """Verifies semantic vector drift between baseline and current embedding spaces."""

    @staticmethod
    def calculate_cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
        """Compute cosine similarity between two vectors."""
        dot_product = np.dot(vec_a, vec_b)
        norm_a = np.linalg.norm(vec_a)
        norm_b = np.linalg.norm(vec_b)
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return float(dot_product / (norm_a * norm_b))

    @classmethod
    def analyze_semantic_drift(
        cls,
        baseline_embeddings: List[List[float]],
        current_embeddings: List[List[float]],
        alert_threshold: float = 0.75,
    ) -> Tuple[float, bool, Dict[str, Any]]:
        """
        Validates incoming data distributions against a golden baseline embedding matrix.
        Returns:
        Tuple containing:
        - mean_similarity (float): The average semantic alignment.
        - drift_detected (bool): Boolean trigger for alerting ops engines.
        - metrics (Dict): Structural metadata of the shift vector.
        """
        A = np.array(baseline_embeddings)
        B = np.array(current_embeddings)
        if A.size == 0 or B.size == 0:
            raise ValueError(
                "Embedding lists must not be empty."
            )
        # Calculate centroids of the semantic spaces
        centroid_a = np.mean(A, axis=0)
        centroid_b = np.mean(B, axis=0)
        mean_similarity = cls.calculate_cosine_similarity(centroid_a, centroid_b)
        drift_detected = mean_similarity < alert_threshold
        metrics = {
            "centroid_distance": float(np.linalg.norm(centroid_a - centroid_b)),
            "baseline_variance": float(np.var(A)),
            "current_variance": float(np.var(B)),
            "similarity_score": mean_similarity,
        }
        return mean_similarity, drift_detected, metrics
