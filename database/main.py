from routes import create_app
import dotenv
import os
import uvicorn
dotenv.load_dotenv()

app = create_app()

port= os.getenv("PORT") if os.getenv("PORT")  else 4500
debug=os.getenv("MODE") != "production" 


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
 