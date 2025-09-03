from flask import Flask
from flask_cors import CORS
from .routes.home_routes import home_routes
from .routes.auth import auth_routes 
from .models.stock import stock_routes
from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(home_routes)
    app.register_blueprint(auth_routes)
    app.register_blueprint(stock_routes)
    return app
