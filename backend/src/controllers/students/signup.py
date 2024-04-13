from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from ...utils.serverUtil import bcrypt


def signup():
    body = request.get_json()
    existUser = db.students.find_one({"email": body["email"]})
    if not existUser:
        hashedPassword = bcrypt.generate_password_hash(
            body["password"]).decode()
        user = {
            "name": body["name"],
            "email": body["email"],
            "class": body["class"],
            "password": hashedPassword
        }
        print(type(user))
        db.students.insert_one(user)
        return ApiResponse(200, None).json
    return ApiError(200, "Email id already exists").json
