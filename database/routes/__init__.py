from flask import Flask
from .download import route as download
from .data_management import route as manage_data
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    CORS(app, origins="*")

    app.register_blueprint(download)
    app.register_blueprint(manage_data)
    
    return app
