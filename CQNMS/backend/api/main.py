from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from core.engine import get_engine_stats

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats")
def read_stats(algo: str = Query("Round Robin"), intensity: int = Query(1000)):
    return get_engine_stats(algo, intensity)

@app.get("/")
def home():
    return {"status": "online", "project": "CQNMS"}