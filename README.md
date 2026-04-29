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

---

## Frontend (React UI)

A Vite-powered React dashboard lives in the [`ui/`](./ui) directory.

```bash
cd ui
npm install
npm run dev
# App available at http://localhost:3000
```

See [`ui/README.md`](./ui/README.md) for full details (build, proxy config,
project structure).