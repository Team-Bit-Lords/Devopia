from flask import Flask
from werkzeug.exceptions import HTTPException
from .utils.ApiError import ApiError

app = Flask(__name__) # type: ignore

app.config.from_pyfile("config.py")

from .routes.router import router

app.register_blueprint(router)

@app.errorhandler(HTTPException)
def handleHttpException(error):
    return ApiError(error.code, error.description).json

@app.errorhandler(Exception)
def handleException(error):
    return ApiError(200, error.__doc__).json