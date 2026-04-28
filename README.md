# End-to-End ETL + ML Pipeline

A lightweight, educational micro-project that demonstrates a complete
**Extract → Transform → Load → Train → Evaluate** workflow using Python,
pandas, and scikit-learn.

---

## Project Structure

```
.
├── data/
│   ├── sample_data.csv        # Raw input dataset (customer churn)
│   └── processed_data.csv     # Generated after running the pipeline
├── etl/
│   ├── extract.py             # Stage 1 – load raw CSV into a DataFrame
│   ├── transform.py           # Stage 2 – clean, encode, and scale data
│   └── load.py                # Stage 3 – persist transformed data to disk
├── ml/
│   ├── train.py               # Stage 4 – train a RandomForest classifier
│   └── evaluate.py            # Stage 5 – print accuracy & classification report
├── model/
│   └── rf_model.joblib        # Generated model artefact (created at runtime)
├── tests/
│   └── test_pipeline.py       # Unit tests for all pipeline stages
├── pipeline.py                # Orchestrator – runs all five stages end-to-end
└── requirements.txt           # Python dependencies
```

---

## Dataset

`data/sample_data.csv` contains 40 synthetic customer records with the
following columns:

| Column             | Type        | Description                              |
|--------------------|-------------|------------------------------------------|
| `customer_id`      | int         | Unique identifier (dropped during ETL)   |
| `tenure`           | float       | Months the customer has been active      |
| `monthly_charges`  | float       | Monthly billing amount (USD)             |
| `total_charges`    | float       | Cumulative charges to date (USD)         |
| `contract_type`    | categorical | `Month-to-month`, `One year`, `Two year` |
| `internet_service` | categorical | `DSL`, `Fiber optic`, `No`               |
| `churn`            | int (0/1)   | Target: 1 = churned, 0 = retained        |

---

## Quick Start

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the full pipeline

```bash
python pipeline.py
```

Expected output:

```
============================================================
  End-to-End ETL + ML Pipeline
============================================================

--- Stage 1: Extract ---
[Extract] Loaded 40 rows and 7 columns from 'data/sample_data.csv'.

--- Stage 2: Transform ---
[Transform] Transformation complete. Shape: (40, 6)

--- Stage 3: Load ---
[Load] Saved 40 rows to 'data/processed_data.csv'.

--- Stage 4: Train ---
[Train] Model trained on 32 samples and saved to 'model/rf_model.joblib'.

--- Stage 5: Evaluate ---
[Evaluate] Accuracy : 0.8750
[Evaluate] Classification Report:
              precision    recall  f1-score   support
           0       0.83      1.00      0.91         5
           1       1.00      0.67      0.80         3
    accuracy                           0.88         8
...
============================================================
  Pipeline completed successfully.
============================================================
```

### 3. Run the tests

```bash
pytest tests/ -v
```

---

## Pipeline Stages

| Stage     | Module              | Description                                         |
|-----------|---------------------|-----------------------------------------------------|
| Extract   | `etl/extract.py`    | Reads a CSV file into a pandas DataFrame            |
| Transform | `etl/transform.py`  | Drops IDs, removes nulls, label-encodes categoricals, standard-scales numerics |
| Load      | `etl/load.py`       | Writes the processed DataFrame back to a CSV file   |
| Train     | `ml/train.py`       | Splits data 80/20, fits a RandomForestClassifier, saves the model with joblib |
| Evaluate  | `ml/evaluate.py`    | Computes accuracy, classification report, and confusion matrix |