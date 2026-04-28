"""Train stage: split data and fit a RandomForest classifier."""

import joblib
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from typing import Tuple

TARGET_COL = "churn"
MODEL_PATH = "model/rf_model.joblib"


def train(
    df: pd.DataFrame,
    test_size: float = 0.2,
    random_state: int = 42,
    model_path: str = MODEL_PATH,
) -> Tuple[RandomForestClassifier, pd.DataFrame, pd.Series]:
    """Train a RandomForest classifier and persist it to disk.

    Parameters
    ----------
    df : pd.DataFrame
        Transformed DataFrame containing features and the target column.
    test_size : float
        Fraction of data to hold out for evaluation.
    random_state : int
        Seed for reproducibility.
    model_path : str
        Where to save the trained model artefact.

    Returns
    -------
    model : RandomForestClassifier
        Fitted classifier.
    X_test : pd.DataFrame
        Test feature matrix.
    y_test : pd.Series
        Test labels.
    """
    X = df.drop(columns=[TARGET_COL])
    y = df[TARGET_COL]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )

    model = RandomForestClassifier(n_estimators=100, random_state=random_state)
    model.fit(X_train, y_train)

    os.makedirs(os.path.dirname(os.path.abspath(model_path)), exist_ok=True)
    joblib.dump(model, model_path)
    print(f"[Train] Model trained on {len(X_train)} samples and saved to '{model_path}'.")

    return model, X_test, y_test
