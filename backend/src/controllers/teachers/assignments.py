from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def add_assignments():
    email = get_jwt_identity()
    body = request.get_json()
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        return ApiError(404, "No such user exists").json
    else:
        db.assignments.insert_one({
            "subject": body["subject"],
            "teacher": body["teacher"],
            "due_date": body["due_date"],
            "name": body["name"],
            "description": body["description"],
            "uploaded": []
        })
        return ApiResponse(200, None).json

@jwt_required()
def get_assignments():
    email = get_jwt_identity()
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        return ApiError(404, "No such user exists").json
    else:
        assignments = db.assignments.find({"teacher": email})
        response = {
            "assignments": assignments
        }
        return ApiResponse(200, response).json
