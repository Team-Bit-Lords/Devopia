from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def subject_wise_videos():
    subject_name = request.get_json()["subject"]
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser and existUser["class"] is not None:
        user_class = db.courses.find_one({"class": existUser["class"]})

        all_videos = []
        for subject in user_class["courses"]:  # type: ignore
            for video in subject["videos"]:
                if subject["name"] == subject_name:
                    all_videos.append({
                        "topic": video["topic"],
                        "video": video["video"],
                        "description": video["description"]
                    })

        return ApiResponse(200, all_videos).json
    else:
        return ApiError(500, "There was some error with the server").json

@jwt_required()
def subject_wise_quizzes():
    subject = request.get_json()["subject"]
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser and existUser["class"] is not None:
        subject_quizzes = [
            quiz for quiz in existUser["quizzes"] if quiz["subject"] == subject]

        return ApiResponse(200, subject_quizzes).json
    else:
        return ApiError(500, "There was some error with the server").json
