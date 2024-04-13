from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def previous_quizzes():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(402, "No such user exists").json
    
    user_quizzes = existUser["quizzes"]
    return ApiResponse(200, user_quizzes).json
