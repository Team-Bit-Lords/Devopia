from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required
from uuid import uuid5, NAMESPACE_DNS

@jwt_required()
def quiz_submit():
    body = request.get_json()
    email = get_jwt_identity()
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(403, "No such user exists").json

    encode_string = f'{body["subject"]}{body["topic"]}'
    quiz_id = uuid5(NAMESPACE_DNS, encode_string)

    if "quizzes" in existUser:
        for quiz in existUser["quizzes"]:
            if quiz["id"] == str(quiz_id):
                db.students.update_one({"email": email, "quizzes.id": str(quiz_id) }, {
                    "$push": {
                        "quizzes.$.quiz": {
                            "question": body["question"],
                            "answer": body["answer"],
                            "options": body["options"],
                            "correct": body["correct"]
                        
                        }
                    }
                })
                return ApiResponse(200, None).json

    db.students.update_one({"email": email}, {
        "$push": {
            "quizzes": {
                "id": str(quiz_id),
                "subject": body["subject"],
                "topic": body["topic"],
                "quiz": [{
                    "question": body["question"],
                    "answer": body["answer"],
                    "options": body["options"],
                    "correct": body["correct"]
                }]
            }
        }
    })
        
    return ApiResponse(200, None).json
