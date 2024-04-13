from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def get_students():
    email = get_jwt_identity()
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        return ApiError(404, "No such user exists").json
    else:
        all_students = db.students.find({}, {"_id": 0})
        print(all_students)
        return ApiResponse(200, list(all_students)).json # type: ignore
