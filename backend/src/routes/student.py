from flask import Blueprint
from ..controllers.students.login import login
from ..controllers.students.signup import signup

student = Blueprint("student", __name__, url_prefix="/student")

student.add_url_rule("/login", view_func=login, methods=["POST"])
student.add_url_rule("/signup", view_func=signup, methods=["POST"])