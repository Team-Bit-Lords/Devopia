from .server import app
from .utils.serverUtil import bcrypt, jwt
from flask_cors import CORS

CORS(app)
bcrypt.init_app(app)
jwt.init_app(app)
