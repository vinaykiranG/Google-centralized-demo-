from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import DemoSummary, DemoDetail
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
try:
    cred = credentials.Certificate("backend/firebase-service-account.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    demos_collection = db.collection('demos')
except Exception as e:
    print(f"Failed to initialize Firebase: {e}")
    db = None
    demos_collection = None

app = FastAPI()

origins = [
    "http://localhost:4200",  # Angular frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/demos", response_model=DemoDetail)
def create_demo(demo: DemoDetail):
    if not demos_collection:
        raise HTTPException(status_code=500, detail="Firestore not initialized")
    doc_ref = demos_collection.document(demo.id)
    doc_ref.set(demo.dict())
    return demo

@app.get("/api/demos", response_model=List[DemoSummary])
def get_demos():
    if not demos_collection:
        raise HTTPException(status_code=500, detail="Firestore not initialized")
    demos = []
    for doc in demos_collection.stream():
        demos.append(DemoSummary(**doc.to_dict()))
    return demos

@app.get("/api/demos/{demo_id}", response_model=DemoDetail)
def get_demo(demo_id: str):
    if not demos_collection:
        raise HTTPException(status_code=500, detail="Firestore not initialized")
    doc_ref = demos_collection.document(demo_id)
    doc = doc_ref.get()
    if doc.exists:
        return DemoDetail(**doc.to_dict())
    else:
        raise HTTPException(status_code=404, detail="Demo not found")

@app.put("/api/demos/{demo_id}", response_model=DemoDetail)
def update_demo(demo_id: str, demo: DemoDetail):
    if not demos_collection:
        raise HTTPException(status_code=500, detail="Firestore not initialized")
    doc_ref = demos_collection.document(demo_id)
    doc_ref.set(demo.dict(), merge=True)
    return demo

@app.delete("/api/demos/{demo_id}")
def delete_demo(demo_id: str):
    if not demos_collection:
        raise HTTPException(status_code=500, detail="Firestore not initialized")
    doc_ref = demos_collection.document(demo_id)
    doc_ref.delete()
    return {"status": "success", "message": f"Demo {demo_id} deleted"}
