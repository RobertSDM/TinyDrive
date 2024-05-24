from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .download import route as download
from .data_management import route as manage_data
# from flask_cors import CORS

def create_app():
    app = FastAPI()

    # CORS(app, origins="*")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"]
    )

    app.include_router(download)
    app.include_router(manage_data)
    
    return app
