from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required
import uuid
@jwt_required()
def add_assignments():
    email = get_jwt_identity()
    body = request.get_json()
    print(body)
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        return ApiError(404, "No such user exists").json
    else:
        db.assignments.insert_one({
            "subject": body["subject"],
            "teacher": exist_teacher["name"],
            "due_date": body["due_date"],
            "name": body["name"],
            "description": body["description"],
            "id": uuid.uuid4().hex,
            "uploaded": []
        })
        return ApiResponse(200, None).json

@jwt_required()
def get_assignments():
    email = get_jwt_identity()
    exist_teacher = db.teachers.find_one({"email": email})
    if not exist_teacher:
        assignments = db.assignments.find({}, {"_id": 0})
        response = {
            "assignments": [assignment for assignment in assignments]
        }

        return ApiResponse(200, response).json
    else:
        assignments = db.assignments.find({"teacher": exist_teacher["name"]}, {"_id": 0})
        response = {
            "assignments": [assignment for assignment in assignments]
        }
        return ApiResponse(200, response).json

@jwt_required()
def get_uploaded(assignment_id):
    email = get_jwt_identity()
    existUser = db.teachers.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    else:
        assignments = db.assignments.find({ "teacher": existUser["name"] }, { "_id": 0 })
        response = {
            "uploaded": [assignment for assignment in assignments if assignment["id"] == assignment_id][0]["uploaded"]
        }
        return ApiResponse(200, response).json
