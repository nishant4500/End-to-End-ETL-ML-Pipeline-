"""Unit tests for the ETL and ML pipeline modules."""

import os
import tempfile

import pandas as pd
import pytest

from etl.extract import extract
from etl.transform import transform
from etl.load import load
from ml.train import train
from ml.evaluate import evaluate


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

SAMPLE_CSV_CONTENT = """\
customer_id,tenure,monthly_charges,total_charges,contract_type,internet_service,churn
1,12,65.5,786.0,Month-to-month,Fiber optic,1
2,34,89.0,3026.0,One year,DSL,0
3,5,45.0,225.0,Month-to-month,No,1
4,60,100.0,6000.0,Two year,Fiber optic,0
5,2,70.0,140.0,Month-to-month,Fiber optic,1
6,48,55.5,2664.0,One year,DSL,0
7,1,75.0,75.0,Month-to-month,Fiber optic,1
8,72,90.0,6480.0,Two year,DSL,0
9,18,60.0,1080.0,Month-to-month,No,0
10,36,85.0,3060.0,One year,Fiber optic,0
"""


@pytest.fixture
def sample_csv(tmp_path):
    csv_file = tmp_path / "sample.csv"
    csv_file.write_text(SAMPLE_CSV_CONTENT)
    return str(csv_file)


@pytest.fixture
def raw_df(sample_csv):
    return extract(sample_csv)


@pytest.fixture
def transformed_df(raw_df):
    return transform(raw_df)


# ---------------------------------------------------------------------------
# Extract tests
# ---------------------------------------------------------------------------

class TestExtract:
    def test_returns_dataframe(self, sample_csv):
        df = extract(sample_csv)
        assert isinstance(df, pd.DataFrame)

    def test_correct_row_count(self, sample_csv):
        df = extract(sample_csv)
        assert len(df) == 10

    def test_expected_columns(self, sample_csv):
        df = extract(sample_csv)
        expected = {"customer_id", "tenure", "monthly_charges", "total_charges",
                    "contract_type", "internet_service", "churn"}
        assert expected.issubset(set(df.columns))

    def test_missing_file_raises(self):
        with pytest.raises(FileNotFoundError):
            extract("/nonexistent/path/data.csv")


# ---------------------------------------------------------------------------
# Transform tests
# ---------------------------------------------------------------------------

class TestTransform:
    def test_returns_dataframe(self, raw_df):
        df = transform(raw_df)
        assert isinstance(df, pd.DataFrame)

    def test_customer_id_dropped(self, raw_df):
        df = transform(raw_df)
        assert "customer_id" not in df.columns

    def test_target_column_present(self, raw_df):
        df = transform(raw_df)
        assert "churn" in df.columns

    def test_no_missing_values(self, raw_df):
        df = transform(raw_df)
        assert df.isnull().sum().sum() == 0

    def test_categorical_columns_are_numeric(self, raw_df):
        df = transform(raw_df)
        for col in ["contract_type", "internet_service"]:
            assert pd.api.types.is_numeric_dtype(df[col]), f"{col} should be numeric after encoding"

    def test_row_count_unchanged_when_no_nulls(self, raw_df):
        df = transform(raw_df)
        assert len(df) == len(raw_df)

    def test_missing_values_are_dropped(self, raw_df):
        raw_with_nulls = raw_df.copy()
        raw_with_nulls.loc[0, "tenure"] = None
        df = transform(raw_with_nulls)
        assert len(df) == len(raw_df) - 1


# ---------------------------------------------------------------------------
# Load tests
# ---------------------------------------------------------------------------

class TestLoad:
    def test_creates_output_file(self, transformed_df, tmp_path):
        out = str(tmp_path / "output.csv")
        load(transformed_df, out)
        assert os.path.exists(out)

    def test_output_has_correct_row_count(self, transformed_df, tmp_path):
        out = str(tmp_path / "output.csv")
        load(transformed_df, out)
        reloaded = pd.read_csv(out)
        assert len(reloaded) == len(transformed_df)

    def test_creates_parent_directories(self, transformed_df, tmp_path):
        out = str(tmp_path / "nested" / "dir" / "output.csv")
        load(transformed_df, out)
        assert os.path.exists(out)


# ---------------------------------------------------------------------------
# Train tests
# ---------------------------------------------------------------------------

class TestTrain:
    def test_returns_model_and_test_split(self, transformed_df, tmp_path):
        model_path = str(tmp_path / "model" / "rf.joblib")
        model, X_test, y_test = train(transformed_df, model_path=model_path)
        assert model is not None
        assert len(X_test) > 0
        assert len(y_test) > 0

    def test_model_file_created(self, transformed_df, tmp_path):
        model_path = str(tmp_path / "model" / "rf.joblib")
        train(transformed_df, model_path=model_path)
        assert os.path.exists(model_path)

    def test_target_not_in_features(self, transformed_df, tmp_path):
        model_path = str(tmp_path / "model" / "rf.joblib")
        _, X_test, _ = train(transformed_df, model_path=model_path)
        assert "churn" not in X_test.columns


# ---------------------------------------------------------------------------
# Evaluate tests
# ---------------------------------------------------------------------------

class TestEvaluate:
    def test_returns_accuracy_in_range(self, transformed_df, tmp_path):
        model_path = str(tmp_path / "model" / "rf.joblib")
        model, X_test, y_test = train(transformed_df, model_path=model_path)
        metrics = evaluate(model, X_test, y_test)
        assert 0.0 <= metrics["accuracy"] <= 1.0

    def test_metrics_keys_present(self, transformed_df, tmp_path):
        model_path = str(tmp_path / "model" / "rf.joblib")
        model, X_test, y_test = train(transformed_df, model_path=model_path)
        metrics = evaluate(model, X_test, y_test)
        assert "accuracy" in metrics
        assert "report" in metrics
        assert "confusion_matrix" in metrics
