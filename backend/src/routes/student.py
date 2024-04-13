from flask import Blueprint
from ..controllers.students.login import login
from ..controllers.students.signup import signup
from ..controllers.students.courses import courses_name
from ..controllers.students.subject_wise import subject_wise_videos, subject_wise_quizzes
from ..controllers.students.quiz_submit import quiz_submit
from ..controllers.students.fetch_quiz import previous_quizzes, get_subject_quiz
from ..controllers.students.chatbot import chatbot
from ..controllers.students.attendance import attendance
from ..controllers.students.assignments import upload_assignments

student = Blueprint("student", __name__, url_prefix="/student")

student.add_url_rule("/login", view_func=login, methods=["POST"])
student.add_url_rule("/signup", view_func=signup, methods=["POST"])
student.add_url_rule("/courses", view_func=courses_name, methods=["GET"])
student.add_url_rule("/subject_videos", view_func=subject_wise_videos, methods=["GET"])
student.add_url_rule("/subject_quizzes", view_func=subject_wise_quizzes, methods=["POST"])
student.add_url_rule("/quiz", view_func=quiz_submit, methods=["POST"])
student.add_url_rule("/previous_quizzes", view_func=previous_quizzes, methods=["GET"])
student.add_url_rule("/chatbot", view_func=chatbot, methods=["POST"])
student.add_url_rule("/attendance", view_func=attendance, methods=["GET"])
student.add_url_rule("/upload_assignment", view_func=upload_assignments, methods=["POST"])
student.add_url_rule("/fetch_quiz", view_func=get_subject_quiz, methods=["POST"])

