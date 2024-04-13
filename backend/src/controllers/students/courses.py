from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity


def courses():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser and existUser["class"] is not None:
        user_class = db.courses.find_one({"class": existUser["class"]})
        return_courses = []
        for course in user_class["courses"]:  # type: ignore
            return_courses.append(course["name"])
        response = {
            "courses": return_courses
        }
        return ApiResponse(200, response).json
    return ApiError(500, "There was some error with the server").json

def quizzes():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser:
        user_quizzes = existUser["quizzes"]
        response = {
            "quizzes": user_quizzes
        }
        return ApiResponse(200, response).json
    return ApiError(500, "There was some error with the server").json
    