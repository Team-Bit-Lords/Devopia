from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity


def upload_assignments():
    email = get_jwt_identity()
    body = request.get_json()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    else:
        db.assignments.update_one({ "name": body["name"] }, {
            "$push": {
                "uploaded": {
                    "email": body["email"],
                    "name": body["student_name"],
                    "assignment": body["assignment"]
                }
            }
        })
        return ApiResponse(200, None).json