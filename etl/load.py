"""Load stage: persist the transformed DataFrame to disk."""

import os
import pandas as pd


def load(df: pd.DataFrame, output_path: str) -> None:
    """Save the transformed DataFrame as a CSV file.

    Parameters
    ----------
    df : pd.DataFrame
        Transformed DataFrame to persist.
    output_path : str
        Destination file path (e.g. ``data/processed_data.csv``).
    """
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"[Load] Saved {len(df)} rows to '{output_path}'.")
