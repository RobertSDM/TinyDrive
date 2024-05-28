from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.FileRest import route as file_route
from service.logging_config import logger
import dotenv, os, uvicorn

dotenv.load_dotenv()

app = FastAPI(title="Tiny Drive")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(file_route)
    
port= os.environ.get("PORT") if os.environ.get("PORT") else 4500
debug= "info" if os.environ.get("MODE") != "production" else "debug"
host= os.environ.get("HOST") if os.environ.get("HOST") else "127.0.0.1"

if __name__ == "__main__":
    uvicorn.run("main:app", host=host, port=port, reload=True, log_level=debug)
    logger.info("Api started on: " + host + ":" + port)