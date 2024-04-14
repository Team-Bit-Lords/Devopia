"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const params = useParams();
  const [start, setStart] = useState(true);
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [showQuizBox, setShowQuizBox] = useState(false);
  const [showResultBox, setShowResultBox] = useState(false);

  const [quiz, setQuiz] = useState([]);

  const handleQuiz = async () => {
    const token = localStorage.getItem("token");

    const response = await axios
      .post(
        "http://127.0.0.1:5000/api/student/fetch_specific_quiz",
        {
          subject: params.subject,
          topic: params.topic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);

    setQuiz(response.body);
    console.log(quiz);
    setShowInfoBox(false);
    setShowQuizBox(true);
  };

  return (
    <div className="relative h-full ">
      {/* Start Quiz button */}
      {start && (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <button
            className="px-8 py-4 text-2xl font-semibold text-green-700 bg-white rounded cursor-pointer"
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
        <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg top-1/2 left-1/2 w-96">
          <div className="mb-4 text-lg font-semibold">
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
              className="px-4 py-2 mr-2 text-sm font-semibold text-white bg-green-700 rounded"
              onClick={handleQuiz}
            >
              Continue
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold text-green-700 bg-white border border-green-700 rounded"
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
      {showQuizBox && <Quiz questions={quiz} />}

      {/* Result Box */}
      {showResultBox && (
        <div className="p-8 bg-white rounded shadow-lg w-96">
          {/* Add Result Box content here */}
        </div>
      )}
    </div>
  );
};

function Quiz({ questions }) {
  const param = useParams();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [content,setContent] = useState([]);

  useEffect(() => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = "Hello World";
    window.speechSynthesis.speak(msg);
  }, [currentIndex]);

  function handleSelected(e, index) {
    if (selected == index) {
      setSelected(null);
      // console.log(e);
      e.target.blur();
      return;
    }
    setSelected(index);
  }

  async function handleNext() {
    if (currentIndex === questions.length - 1) {
      router.back();
      return;
    }

    const token = localStorage.getItem("token");

    const response = await axios
      .post(
        "http://127.0.0.1:5000/api/student/quiz",
        {
          subject: param.subject,
          topic: param.topic,
          question: questions[currentIndex].text,
          options: questions[currentIndex].options,
          answer: selected,
          correct: questions[currentIndex].correct,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);

    if (response.success == false) {
      toast.error("Failed to submit answer");
    }
    console.log(response)
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
  }

  return (
    <div className="flex flex-col h-full p-6 mt-6 bg-white rounded-lg shadow-xl">
      <div>
        <p>
          <span className="text-3xl font-bold">Q{currentIndex + 1}.</span>{" "}
          <span
            className="text-2xl"
            dangerouslySetInnerHTML={{ __html: questions[currentIndex].text }}
          ></span>
        </p>
        <div className="w-full mt-10 sm:w-4/6">
          {questions[currentIndex].options.map((option, index) => {
            return (
              <div
                className="flex items-center justify-center p-2 mt-5"
                key={index}
                onClick={(e) => handleSelected(e, index)}
              >
                <span className="text-lg font-semibold mr-[20%]">
                  {index + 1}
                </span>
                <button
                  className="w-4/6 px-4 py-2 text-lg text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  dangerouslySetInnerHTML={{ __html: option }}
                ></button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-end justify-center w-full h-full">
        <button
          disabled={selected == null}
          onClick={handleNext}
          className={`px-6 py-3 text-2xl inline uppercase font-semibold border rounded-lg text-white ${
            selected == null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
        >
          Next
        </button>
        <div className="inline p-3 mx-5 text-xl font-medium rounded-lg bg-slate-300">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
}

export default Page;
