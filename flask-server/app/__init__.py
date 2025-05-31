from flask import Flask
from flask_cors import CORS
from .routes.home_routes import home_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(home_routes)
    return app
