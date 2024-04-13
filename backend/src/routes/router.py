from flask import Blueprint
from .student import student
from .teacher import teacher

router = Blueprint("router", __name__, url_prefix="/api")

router.register_blueprint(student)
router.register_blueprint(teacher)