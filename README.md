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

## Docker / Container deployment

### Build and run locally

```bash
# From the repo root
docker build -t etl-ml-backend ./project
docker run -p 8000:8000 etl-ml-backend
# API available at http://localhost:8000
```

### Deploy to Azure App Service for Containers

The CI/CD workflow at `.github/workflows/azure-backend-container-deploy.yml`
builds the Docker image, pushes it to GitHub Container Registry, and deploys
it to Azure App Service for Containers automatically on every push to `main`
that touches the `project/` directory.

#### Prerequisites

1. Create an **Azure App Service** (Linux) with the **Docker Container**
   publish option and note the app name.
2. In the App Service → **Configuration → Application settings**, add:
   | Setting | Value |
   |---|---|
   | `WEBSITES_PORT` | `8000` |
3. Add the following **GitHub repository secrets**:
   | Secret | Description |
   |---|---|
   | `AZURE_CLIENT_ID` | App registration client ID (for OIDC federated credential) |
   | `AZURE_TENANT_ID` | Azure AD tenant ID |
   | `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |
   | `AZURE_WEBAPP_NAME` | Your App Service name (e.g. `my-etl-backend`) |

   > **OIDC setup (recommended):** Create a federated credential on your app
   > registration for GitHub Actions (`repo:<org>/<repo>:ref:refs/heads/main`)
   > and grant the service principal the **Contributor** role on the App Service.
   > The workflow uses `azure/login@v2` with `client-id`, `tenant-id`, and
   > `subscription-id` inputs – no long-lived secrets required.

#### Manual deploy (one-time)

```bash
# Build & tag
docker build -t <registry>/etl-ml-backend:latest ./project

# Push
docker push <registry>/etl-ml-backend:latest

# Deploy via Azure CLI
az webapp config container set \
  --name <AZURE_WEBAPP_NAME> \
  --resource-group <RESOURCE_GROUP> \
  --docker-custom-image-name <registry>/etl-ml-backend:latest
```

#### Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Port uvicorn listens on inside the container |
| `WEBSITES_PORT` | `8000` | Tells Azure App Service which internal port to expose |

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
