from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from ...utils.serverUtil import bcrypt


def signup():
    body = request.get_json()
    existUser = db.teachers.find_one({"email": body["email"]})
    if not existUser:
        hashedPassword = bcrypt.generate_password_hash(body["password"]).decode()
        user = {
            body["name"], 
            body["email"], 
            hashedPassword
        }
        db.teachers.insert_one(user.__dict__)
        return ApiResponse(200, None).json
    return ApiError(200, "Email id already exists").json