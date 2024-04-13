from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def update_attendance():
    email = get_jwt_identity()
    student_email = request.get_json()["email"]
    status = request.get_json()["status"]
    date = request.get_json()["date"]
    exist_teacher = db.teachers.find_one({"email": email})
    exist_student = db.students.find_one({"email": student_email})
    if not exist_teacher or not exist_student:
        return ApiError(404, "No such user exists").json
    else:
        db.students.update_one({ "email": student_email }, {
            "$push": {
                "attendance": {
                    "date": date.split("T")[0],
                    "status": status
                }
            }
        })
        return ApiResponse(200, None).json
