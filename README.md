# End-to-End ETL / ML Pipeline

A production-ready pipeline that extracts raw retail data, transforms it into
ML-ready features, trains a regression model, and serves real-time sales
predictions through a **FastAPI** backend.

---

## Backend (FastAPI)

```bash
cd project
pip install -r requirements.txt
uvicorn app.main:app --reload
# API available at http://localhost:8000
```

### API Endpoints

| Method | Path       | Description                                  |
|--------|------------|----------------------------------------------|
| POST   | /predict   | Run a sales prediction; stores result in history |
| GET    | /history   | Return list of all predictions made this session (input data + prediction + timestamp) |

**POST /predict** — request body (JSON):

```json
{
  "Dept": 1, "IsHoliday": 0, "Temperature": 65.0, "Fuel_Price": 3.5,
  "CPI": 210.0, "Unemployment": 7.0, "Size": 150000,
  "Year": 2024, "Month": 1, "Week": 1
}
```

Response: `{"prediction": 12345.67}`

**GET /history** — response:

```json
{
  "history": [
    {
      "timestamp": "2024-01-01T12:00:00+00:00",
      "input": { "Dept": 1, "IsHoliday": 0, ... },
      "prediction": 12345.67
    }
  ]
}
```

> **Note:** History is stored in memory and resets when the server restarts.

---

## Frontend (React UI)

A Vite-powered React app lives in the [`ui/`](./ui) directory.

```bash
cd ui
npm install
npm run dev
# App available at http://localhost:3000
```

The UI includes:
- **Sales Prediction form** — enter store/date features and click **Start Prediction**.
- **Prediction History panel** — shows all prior predictions (input data points, prediction value, timestamp), fetched from `GET /history`.
