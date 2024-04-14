from flask import Blueprint
from ..controllers.teachers.login import login
from ..controllers.teachers.signup import signup
from ..controllers.teachers.attendance import update_attendance
from ..controllers.teachers.assignments import add_assignments, get_assignments
from ..controllers.teachers.students import get_students
from ..controllers.teachers.assignments import get_uploaded
from ..controllers.teachers.result import result

teacher = Blueprint("teacher", __name__, url_prefix="/teacher")

teacher.add_url_rule("/login", view_func=login, methods=["POST"]) 
teacher.add_url_rule("/signup", view_func=signup, methods=["POST"])
teacher.add_url_rule("/update_attendance", view_func=update_attendance, methods=["POST"])
teacher.add_url_rule("/add_assignment", view_func=add_assignments, methods=["POST"])
teacher.add_url_rule("/get_assignments", view_func=get_assignments, methods=["GET"])
teacher.add_url_rule("/get_students", view_func=get_students, methods=["GET"])
teacher.add_url_rule("/get_assignment/<assignment_id>", view_func=get_uploaded, methods=["GET"])
teacher.add_url_rule("/result/<student_email>", view_func=result, methods=["GET"])