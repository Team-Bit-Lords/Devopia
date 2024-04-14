from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

@jwt_required()
def previous_quizzes():
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    print(existUser)
    if not existUser:
        return ApiError(402, "No such user exists").json
    elif "quizzes" in existUser:
        user_quizzes = existUser["quizzes"]
    else:
        user_quizzes = []
    return ApiResponse(200, user_quizzes).json


@jwt_required()
def get_subject_quiz():
    subject_name = request.get_json()["subject"]
    email = get_jwt_identity()

    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(402, "No such user exists").json

    courses = db.courses.find_one({"class": existUser["class"], "courses.name": subject_name})

    all_quizes = []
    for subject in courses["courses"]:
        if subject["name"] == subject_name:
            all_quizes.append(subject["videos"])

    return ApiResponse(200, all_quizes).json

@jwt_required()
def get_specific_quiz():
    subject_name = request.get_json()["subject"]
    topic_name = request.get_json()["topic"]

    email = get_jwt_identity()

    existUser = db.students.find_one({"email": email}, {"class": 1})

    if not existUser:
        return ApiError(402, "No such user exists").json

    courses = db.courses.find_one({
        "class": existUser["class"],
        "courses.name": subject_name,
        "courses.videos.topic": topic_name
    }, {
        "courses.videos.$": 1
    })

    courses = courses["courses"][0]["videos"][0]["quiz"]["questions"]

    return ApiResponse(200, courses).json