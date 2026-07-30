from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import (
    routes_health,
    routes_text,
    routes_history,
    routes_image,
)

from app.db.database import engine, Base
from app.db import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(routes_health.router)
app.include_router(routes_text.router)
app.include_router(routes_history.router)
app.include_router(routes_image.router)