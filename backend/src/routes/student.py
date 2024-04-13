from flask import Blueprint
from ..controllers.students.login import login
from ..controllers.students.signup import signup
from ..controllers.students.courses import courses
from ..controllers.students.chatbot import chatbot

student = Blueprint("student", __name__, url_prefix="/student")

student.add_url_rule("/login", view_func=login, methods=["POST"])
student.add_url_rule("/signup", view_func=signup, methods=["POST"])
student.add_url_rule("/courses", view_func=courses, methods=["POST"])
student.add_url_rule("/chatbot", view_func=chatbot, methods=["POST"])