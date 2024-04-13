from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def update_attendance():
    email = get_jwt_identity()
    student_email = request.get_json()["email"]
    attendance = request.get_json()["attendance"]
    date = request.get_json()["date"]
    exist_teacher = db.teachers.find_one({"email": email})
    exist_student = db.students.find_one({"email": student_email})
    if not exist_teacher or not exist_student:
        return ApiError(404, "No such user exists").json
    else:
        db.students.update_one({ "email": student_email }, {
            "$push": {
                "attendance": {
                    "date": date,
                    "status": attendance
                }
            }
        })
        return ApiResponse(200, None).json
