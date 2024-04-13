from flask import Blueprint
from ..controllers.students.login import login
from ..controllers.students.signup import signup
from ..controllers.students.courses import courses_name
from ..controllers.students.quiz_submit import quiz_submit
from ..controllers.students.fetch_quiz import previous_quizzes
from ..controllers.students.chatbot import chatbot

student = Blueprint("student", __name__, url_prefix="/student")

student.add_url_rule("/login", view_func=login, methods=["POST"])
student.add_url_rule("/signup", view_func=signup, methods=["POST"])
student.add_url_rule("/courses", view_func=courses_name, methods=["GET"])
student.add_url_rule("/quiz", view_func=quiz_submit, methods=["POST"])
student.add_url_rule("/all_quizzes", view_func=previous_quizzes, methods=["GET"])
student.add_url_rule("/chatbot", view_func=chatbot, methods=["POST"])