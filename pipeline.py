"""End-to-End ETL + ML Pipeline orchestrator.

Run this script to execute the full pipeline:
    python pipeline.py
"""

import os

from etl.extract import extract
from etl.transform import transform
from etl.load import load
from ml.train import train
from ml.evaluate import evaluate

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
RAW_DATA_PATH = os.path.join("data", "sample_data.csv")
PROCESSED_DATA_PATH = os.path.join("data", "processed_data.csv")
MODEL_PATH = os.path.join("model", "rf_model.joblib")


def run_pipeline(
    raw_data_path: str = RAW_DATA_PATH,
    processed_data_path: str = PROCESSED_DATA_PATH,
    model_path: str = MODEL_PATH,
) -> dict:
    """Execute every stage of the ETL + ML pipeline.

    Parameters
    ----------
    raw_data_path : str
        Path to the raw CSV input file.
    processed_data_path : str
        Where to write the transformed CSV.
    model_path : str
        Where to save the trained model artefact.

    Returns
    -------
    dict
        Evaluation metrics from the final stage.
    """
    print("=" * 60)
    print("  End-to-End ETL + ML Pipeline")
    print("=" * 60)

    # Stage 1 – Extract
    print("\n--- Stage 1: Extract ---")
    raw_df = extract(raw_data_path)

    # Stage 2 – Transform
    print("\n--- Stage 2: Transform ---")
    transformed_df = transform(raw_df)

    # Stage 3 – Load
    print("\n--- Stage 3: Load ---")
    load(transformed_df, processed_data_path)

    # Stage 4 – Train
    print("\n--- Stage 4: Train ---")
    model, X_test, y_test = train(transformed_df, model_path=model_path)

    # Stage 5 – Evaluate
    print("\n--- Stage 5: Evaluate ---")
    metrics = evaluate(model, X_test, y_test)

    print("\n" + "=" * 60)
    print("  Pipeline completed successfully.")
    print("=" * 60)
    return metrics


if __name__ == "__main__":
    run_pipeline()
