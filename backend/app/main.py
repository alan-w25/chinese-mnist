from fastapi import FastAPI 
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import predict_pipeline

app = FastAPI() 

origins = [
    "http://localhost:3000",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# root endpoint 
@app.get("/api")
async def root(): 
    return {"message": "Welcome to the MNIST digit classifier API"}

app.include_router(predict_pipeline.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}




if __name__ == "__main__":
   uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)