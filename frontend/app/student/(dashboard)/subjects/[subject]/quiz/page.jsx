"use client";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const [start, setStart] = useState(true);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showQuizBox, setShowQuizBox] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);

  const [quizz, setQuiz] = useState({
    topic: "",
    subject: "",
    quiz: [],
  });

  const handleQuiz = async () => {
    const response = await axios
      .post("http://192.168.137.177:5000/api/student/fetch_quiz", {
        subject: params.subject,
      })
      .then((res) => res.data);

    setQuiz(response);
    setShowInfoBox(false);
    setShowQuizBox(true);
  };

  return (
    <div className=" relative h-full">
      {/* Start Quiz button */}
      {start && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="text-2xl font-semibold text-green-700 py-4 px-8 bg-white rounded cursor-pointer"
            onClick={() => {
              setShowInfoBox(true);
              setStart(false);
            }}
          >
            Start Quiz!
          </button>
        </div>
      )}

      {/* Info Box */}
      {showInfoBox && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg p-8 w-96">
          <div className="font-semibold text-lg mb-4">
            Some Rules of this Quiz
          </div>
          <div className="mb-4">
            <div>
              1. You will have only{" "}
              <span className="font-semibold">15 seconds</span> per each
              question.
            </div>
            <div>2. Once you select your answer, it can't be undone.</div>
            <div>3. You can't select any option once time goes off.</div>
            <div>4. You can't exit from the Quiz while you're playing.</div>
            <div>
              5. You'll get points on the basis of your correct answers.
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="text-sm font-semibold text-white bg-green-700 py-2 px-4 rounded mr-2"
              onClick={handleQuiz}
            >
              Continue
            </button>
            <button
              className="text-sm font-semibold text-green-700 bg-white py-2 px-4 rounded border border-green-700"
              onClick={() => {
                setShowInfoBox(false);
              }}
            >
              Exit Quiz
            </button>
          </div>
        </div>
      )}

      {/* Quiz Box */}
      {showQuizBox && (
        <div className=" h-full bg-white rounded-lg shadow-xl p-6 ">
          {quizz.quiz.map((quizdata, index) => (
            <div key={index}>
              <p>{quizdata.quiz}</p>
              <div>
                <p>{quizdata.quiz}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Result Box */}
      {showResultBox && (
        <div className=" bg-white rounded shadow-lg p-8 w-96">
          {/* Add Result Box content here */}
        </div>
      )}
    </div>
  );
};

export default Page;
