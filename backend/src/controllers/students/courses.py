from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import jwt_required, get_jwt_identity

@jwt_required()
def courses_name():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    
    elif existUser and existUser["class"] is not None:
        user_class = db.courses.find_one({"class": existUser["class"]})

        return_courses = []
        for course in user_class["courses"]:  # type: ignore
            return_courses.append(course["name"])
        return ApiResponse(200, return_courses).json
    
    return ApiError(500, "There was some error with the server").json

