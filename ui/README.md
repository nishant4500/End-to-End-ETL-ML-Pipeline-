# ETL / ML Pipeline – React UI

A minimal React dashboard (built with [Vite](https://vitejs.dev/)) that
provides a landing page for the End-to-End ETL/ML Pipeline and a live
**Sales Prediction** form that calls the FastAPI backend.

---

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| Node.js | 18 |
| npm | 9 |

---

## Install dependencies

```bash
cd ui
npm install
```

---

## Development server

```bash
npm run dev
```

The app starts on **http://localhost:3000**.

> **API proxy** – all requests to `/api/*` are automatically proxied to
> `http://localhost:8000` (the FastAPI backend) so CORS is never an issue
> during development.  Make sure the FastAPI server is running before using
> the Predict form:
>
> ```bash
> cd project
> uvicorn app.main:app --reload
> ```

---

## Production build

```bash
npm run build
```

The optimised static files are written to `ui/dist/`.  You can then serve
them with any static-file host or preview locally:

```bash
npm run preview   # http://localhost:4173
```

---

## Project structure

```
ui/
├── index.html
├── vite.config.js        # dev-server + /api proxy config
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Header.jsx / .module.css
        ├── Hero.jsx / .module.css        – pipeline overview + steps
        ├── PipelineStatus.jsx / .module.css  – stage tracker (placeholder)
        ├── RunHistory.jsx / .module.css  – run table (placeholder)
        ├── ModelMetrics.jsx / .module.css   – metric cards (placeholder)
        ├── PredictForm.jsx / .module.css    – live prediction form
        └── Footer.jsx / .module.css
```

---

## Connecting to the backend

The Predict form sends a `POST /api/predict` request with the following JSON
body (which is proxied to `POST http://localhost:8000/predict`):

```json
{
  "Dept": 1,
  "IsHoliday": 0,
  "Temperature": 65.0,
  "Fuel_Price": 3.5,
  "CPI": 210.0,
  "Unemployment": 7.0,
  "Size": 150000,
  "Year": 2024,
  "Month": 1,
  "Week": 1
}
```

The backend is expected to return `{ "prediction": <float> }`.
