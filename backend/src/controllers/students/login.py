from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from ...utils.serverUtil import bcrypt
from flask_jwt_extended import create_access_token

def login():
    body = request.get_json()
    user = db.users.find_one({"email": body["email"],})
    if user and "password" in user:
        if bcrypt.check_password_hash(user["password"], body["password"]):
            token = create_access_token(identity=body["email"])
            return ApiResponse(200, {
                "name": user["name"],
                "email": user["email"],
                "token": token
            }).json
        return ApiError(200, "Password incorrect").json
    return ApiError(200, "Email id not registered").json