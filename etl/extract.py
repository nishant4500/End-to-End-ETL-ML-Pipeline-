"""Extract stage: load raw data from a CSV file into a pandas DataFrame."""

import pandas as pd


def extract(filepath: str) -> pd.DataFrame:
    """Read a CSV file and return a DataFrame.

    Parameters
    ----------
    filepath : str
        Path to the CSV file.

    Returns
    -------
    pd.DataFrame
        Raw data loaded from the CSV.
    """
    df = pd.read_csv(filepath)
    print(f"[Extract] Loaded {len(df)} rows and {len(df.columns)} columns from '{filepath}'.")
    return df
