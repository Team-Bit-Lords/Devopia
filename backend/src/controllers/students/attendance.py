from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity


def attendance():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif "attendance" in existUser:
        attendance_days = (len([day for day in existUser["attendance"]
                           if day["status"] == "present"]) / len(existUser["attendance"])) * 100

        response = {
            "attendance": attendance_days
        }
        return ApiResponse(200, response).json
    return ApiError(500, "There was some error with the server").json
