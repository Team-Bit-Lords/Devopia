from flask import Blueprint
from ..controllers.students.login import login
from ..controllers.students.signup import signup
from ..controllers.students.courses import courses_name
from ..controllers.students.quiz_submit import quiz_submit
from ..controllers.students.fetch_quiz import all_quizzes, get_quiz
from ..controllers.students.chatbot import chatbot
from ..controllers.students.attendance import attendance
from ..controllers.students.assignments import upload_assignments

student = Blueprint("student", __name__, url_prefix="/student")

student.add_url_rule("/login", view_func=login, methods=["POST"])
student.add_url_rule("/signup", view_func=signup, methods=["POST"])
student.add_url_rule("/courses", view_func=courses_name, methods=["GET"])
student.add_url_rule("/quiz", view_func=quiz_submit, methods=["POST"])
student.add_url_rule("/all_quizzes", view_func=all_quizzes, methods=["GET"])
student.add_url_rule("/previous_quizzes", view_func=get_quiz, methods=["POST"])
student.add_url_rule("/chatbot", view_func=chatbot, methods=["POST"])
student.add_url_rule("/attendance", view_func=attendance, methods=["GET"])
student.add_url_rule("/upload_assignment", view_func=upload_assignments, methods=["POST"])