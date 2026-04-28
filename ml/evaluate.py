"""Evaluate stage: compute and display model performance metrics."""

import pandas as pd
from sklearn.base import ClassifierMixin
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


def evaluate(model: ClassifierMixin, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    """Evaluate a fitted classifier against the test split.

    Parameters
    ----------
    model : ClassifierMixin
        Trained scikit-learn compatible classifier.
    X_test : pd.DataFrame
        Test feature matrix.
    y_test : pd.Series
        True labels for the test split.

    Returns
    -------
    dict
        Dictionary containing ``accuracy``, ``report``, and ``confusion_matrix``.
    """
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, zero_division=0)
    cm = confusion_matrix(y_test, y_pred)

    print(f"[Evaluate] Accuracy : {accuracy:.4f}")
    print(f"[Evaluate] Classification Report:\n{report}")
    print(f"[Evaluate] Confusion Matrix:\n{cm}")

    return {"accuracy": accuracy, "report": report, "confusion_matrix": cm}
