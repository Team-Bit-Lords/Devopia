from flask import Blueprint
from ..controllers.teachers import login
from ..controllers.teachers import signup

student = Blueprint("teacher", __name__, url_prefix="/teacher")

student.add_url_rule("/login", view_func=login, methods=["POST"]) # type: ignore
student.add_url_rule("/signup", view_func=signup, methods=["POST"]) # type: ignore