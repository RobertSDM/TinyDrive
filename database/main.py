from routes import create_app
import dotenv
import os

dotenv.load_dotenv()

def main():
    app = create_app()

    port= os.getenv("PORT") if os.getenv("PORT")  else 4500
    debug=os.getenv("MODE") != "production" 

    app.run(debug=debug, 
            port=port)

if __name__ == "__main__":
    main()
 