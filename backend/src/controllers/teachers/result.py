from flask import request, send_file
from ...db.connection import db
from ...utils.ApiResponse import ApiResponse
from ...utils.ApiError import ApiError
from flask_jwt_extended import get_jwt_identity, jwt_required

import csv
from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore


# @jwt_required()
def result(student_email):
    student = db.students.find_one({"email": student_email})
    if not student:
        return ApiError(404, "No such user exists").json
    else:
        # now generate a result for the student using the marks and the data, in a CSV file
        with open(f"results/{student_email}.csv", "w") as file:
            writer = csv.writer(file)

            writer.writerow(["Name", student["name"]])
            writer.writerow(["Email", student["email"]])
            writer.writerow(["Class", student["class"]])
            writer.writerow(["points", student["points"]])

            for subject in student["quizzes"]:
                for q in subject["quiz"]:
                    marks = q["correct"] / 5 * 100
                    writer.writerow([subject, marks])
            llm = ChatGoogleGenerativeAI(model="gemini-pro")
            answer = llm.predict(
                "What are the additional points for the student? Just write some additional points for a tenth grade student.")
            writer.writerow(["Additional Points", answer])

    return send_file(f"../results/{student_email}.csv", as_attachment=True)
