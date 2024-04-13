from flask import Blueprint
from ..controllers.teachers.login import login
from ..controllers.teachers.signup import signup

teacher = Blueprint("teacher", __name__, url_prefix="/teacher")

teacher.add_url_rule("/login", view_func=login, methods=["POST"]) # type: ignore
teacher.add_url_rule("/signup", view_func=signup, methods=["POST"]) # type: ignore