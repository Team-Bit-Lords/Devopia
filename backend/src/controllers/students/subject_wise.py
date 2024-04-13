from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity


def subject_wise_videos():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser and existUser["class"] is not None:
        user_class = db.courses.find_one({"class": existUser["class"]})
        all_videos = []
        for subject in user_class["courses"]:  # type: ignore
            for video in subject["videos"]:
                all_videos.append({
                    "topic": video["topic"],
                    "video": video["video"],
                    "description": video["description"]
                })
        response = {
            "videos": all_videos
        }
        return ApiResponse(200, response).json
    else:
        return ApiError(500, "There was some error with the server").json


def subject_wise_quizzes():
    subject = request.get_json()["subject"]
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(404, "No such user exists").json
    elif existUser and existUser["class"] is not None:
        subject_quizzes = [
            quiz for quiz in existUser["quizzes"] if quiz["subject"] == subject]
        response = {
            "subject_quizzes": subject_quizzes
        }
        return ApiResponse(200, response).json
    else:
        return ApiError(500, "There was some error with the server").json
