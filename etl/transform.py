"""Transform stage: clean, encode and scale the raw DataFrame."""

import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler


CATEGORICAL_COLS = ["contract_type", "internet_service"]
NUMERIC_COLS = ["tenure", "monthly_charges", "total_charges"]
TARGET_COL = "churn"
DROP_COLS = ["customer_id"]


def transform(df: pd.DataFrame) -> pd.DataFrame:
    """Apply all transformation steps to the raw DataFrame.

    Steps performed:
    1. Drop unused identifier columns.
    2. Drop rows with missing values.
    3. Label-encode categorical columns.
    4. Standard-scale numeric columns.

    Parameters
    ----------
    df : pd.DataFrame
        Raw DataFrame returned by the extract stage.

    Returns
    -------
    pd.DataFrame
        Transformed DataFrame ready for model training.
    """
    df = df.copy()

    # 1. Drop identifier columns that carry no predictive value
    df = df.drop(columns=[c for c in DROP_COLS if c in df.columns])

    # 2. Remove rows with any missing values
    before = len(df)
    df = df.dropna()
    dropped = before - len(df)
    if dropped:
        print(f"[Transform] Dropped {dropped} rows with missing values.")

    # 3. Encode categorical columns (each column gets its own encoder instance)
    for col in CATEGORICAL_COLS:
        if col in df.columns:
            df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    # 4. Scale numeric features (exclude the target column)
    scaler = StandardScaler()
    cols_to_scale = [c for c in NUMERIC_COLS if c in df.columns]
    df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])

    print(f"[Transform] Transformation complete. Shape: {df.shape}")
    return df
