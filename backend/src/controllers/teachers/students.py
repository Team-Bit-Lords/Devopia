from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity


def get_students():
    email = get_jwt_identity()
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        return ApiError(404, "No such user exists").json
    else:
        all_students = db.students.find({})
        response = {
            "students": all_students
        }
        return ApiResponse(200, response).json
