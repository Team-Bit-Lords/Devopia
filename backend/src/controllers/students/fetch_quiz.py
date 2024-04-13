from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity

def all_quizzes():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(402, "No such user exists").json
    
    user_quizzes = existUser["quizzes"]
    return ApiResponse(200, user_quizzes).json

def get_quiz():
    quiz_id = request.get_json()["quiz_id"]
    email = get_jwt_identity()

    existUser = db.students.find_one({"email": email})

    if not existUser:
        return ApiError(403, "No such user exists").json
    
    elif existUser and existUser["class"] is not None:
        quiz = [quiz for quiz in existUser["quizzes"] if quiz["id"] == quiz_id]
        return ApiResponse(200, quiz).json

    return ApiError(500, "There was some error with the server").json