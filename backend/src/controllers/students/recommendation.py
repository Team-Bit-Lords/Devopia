from flask import request
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required
from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore
from uuid import uuid5, NAMESPACE_DNS

@jwt_required()
def get_recommendation():
    email = get_jwt_identity()
    
    existUser = db.students.find_one({"email": email})
    if not existUser:
        return ApiError(403, "No such user exists").json
    
    llm  = ChatGoogleGenerativeAI(model='gemini-pro')

    question = request.get_json()['question']
    question = f"The following questions are answered wrong by a student: {question} \
        Provide the recommended topics for the student to study."

    answer = llm.invoke(question)



    return ApiResponse(200, answer.content).json
