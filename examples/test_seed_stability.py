from validators.seed_stability import SeedStabilityVerifier
1. Simulate Scenario A: Deterministic Stable Pipeline
print("--- Scenario A: Evaluating Highly Deterministic Evaluation Run ---")
Mock 5 continuous test runs evaluating a highly controlled agent (very low score variance)
deterministic_scores = [0.92, 0.93, 0.92, 0.92, 0.93]
print(f"Recorded Multi-Turn Scores: {deterministic_scores}")
variance, unstable, logs = SeedStabilityVerifier.verify_metric_stability(
run_scores=deterministic_scores,
variance_tolerance=0.01
)
print(f"Calculated Metric Variance: {variance:.6f}")
print(f"Systemic Instability Flagged: {unstable}")
print(f"Total Range of Score Spread: {logs['score_range']:.4f}\n")
2. Simulate Scenario B: High Variance Non-Deterministic Breakdown
print("--- Scenario B: Evaluating Volatile/Non-Deterministic Evaluation Run ---")
Mock 5 continuous test runs where identical inputs yield high score volatility
volatile_scores = [0.92, 0.61, 0.88, 0.45, 0.91]
print(f"Recorded Multi-Turn Scores: {volatile_scores}")
variance, unstable, logs = SeedStabilityVerifier.verify_metric_stability(
run_scores=volatile_scores,
variance_tolerance=0.01
)
print(f"Calculated Metric Variance: {variance:.6f}")
print(f"Systemic Instability Flagged: {unstable}")
print(f"Calculated Standard Deviation: {logs['standard_deviation']:.4f}")
print(f"Total Range of Score Spread: {logs['score_range']:.4f}")
