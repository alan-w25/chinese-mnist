from fastapi import FastAPI 
import uvicorn
from backend.app.routes import predict_pipeline

app = FastAPI() 

# root endpoint 
@app.get("/")
async def root(): 
    return {"message": "Welcome to the MNIST digit classifier API"}

app.include_router(predict_pipeline.router)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}




if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
