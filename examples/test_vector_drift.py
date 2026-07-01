import numpy as np
from validators.vector_drift import VectorDriftVerifier
1. Establish baseline dimensions matching production embedding standards (e.g., text-embedding-3-small)
embedding_dimensions = 1536
print("--- Initializing Golden Baseline Embedding Matrix ---")
Mock 5 historical queries sitting tightly around a specific topic center
np.random.seed(42)
baseline_data = [list(np.random.normal(0.1, 0.01, embedding_dimensions)) for _ in range(5)]
print(f"Generated {len(baseline_data)} baseline vectors with dimension shape {embedding_dimensions}\n")
2. Simulate Scenario A: Stable Semantic Traffic
print("--- Scenario A: Evaluating Stable Pipeline Traffic ---")
Incoming traffic matches the historical semantic footprint closely
stable_traffic = [list(np.random.normal(0.1, 0.01, embedding_dimensions)) for _ in range(3)]
similarity, drifted, metrics = VectorDriftVerifier.analyze_semantic_drift(
baseline_embeddings=baseline_data,
current_embeddings=stable_traffic,
alert_threshold=0.85
)
print(f"Mean Cosine Similarity: {similarity:.4f}")
print(f"Operational Drift Detected: {drifted}")
print(f"Centroid Topological Distance: {metrics['centroid_distance']:.6f}\n")
3. Simulate Scenario B: Context Shift / Adversarial Intrusion
print("--- Scenario B: Evaluating Out-of-Distribution / Adversarial Traffic ---")
Radical distribution shift away from the baseline center
shifted_traffic = [list(np.random.normal(0.5, 0.02, embedding_dimensions)) for _ in range(3)]
similarity, drifted, metrics = VectorDriftVerifier.analyze_semantic_drift(
baseline_embeddings=baseline_data,
current_embeddings=shifted_traffic,
alert_threshold=0.85
)
print(f"Mean Cosine Similarity: {similarity:.4f}")
print(f"Operational Drift Detected: {drifted}")
print(f"Centroid Topological Distance: {metrics['centroid_distance']:.6f}")
print(f"Current Matrix Variance: {metrics['current_variance']:.6f}")
