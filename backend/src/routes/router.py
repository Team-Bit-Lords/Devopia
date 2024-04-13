from flask import Blueprint
from .student import student

router = Blueprint("router", __name__, url_prefix="/api")

router.register_blueprint(student)