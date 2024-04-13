"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [quizData, setQuizData] = useState([
    { question: "", options: ["", "", "", ""] },
  ]);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    setSubmittedData(quizData)
  }, [quizData]);

  const handleQuestionChange = (index, event) => {
    const newQuizData = [...quizData];
    newQuizData[index].question = event.target.value;
    setQuizData(newQuizData);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuizData = [...quizData];
    newQuizData[index].options[optionIndex-1] = event.target.value;
    setQuizData(newQuizData);
  };

  const addQuizData = () => {
    const lastQuiz = quizData[quizData.length - 1];
    if (lastQuiz.options.length < 4) {
      const newQuizData = [...quizData];
      newQuizData[newQuizData.length].options.push("");
      setQuizData(newQuizData);
    } else {
      setQuizData([
        ...quizData,
        { question: "", options: ["", "", "", ""] },
      ]);
    }
  };
  
  const deleteQuizData = (index) => {
    const newQuizData = [...quizData];
    newQuizData.splice(index, 1);
    setQuizData(newQuizData);
  };

  const handleSubmit = () => {
  setSubmittedData(quizData);

    console.log(quizData);
    console.log("Submitted Data:", submittedData);
  };
  return (
    <>
      <section className="bg-coolGray-50">
        <div className="container px-4 mx-auto h-full">
          <div className="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard">
            <div className="pb-2 border-b border-coolGray-100">
              <div className="flex flex-wrap items-center justify-between -m-2">
                <div className="w-full md:w-auto p-2">
                  <h2 className="text-coolGray-900 text-lg font-semibold">
                    ADD A QUIZ FOR THE STUDENT
                  </h2>
                </div>
              </div>
            </div>
            <div className="py-6 border-b border-coolGray-100">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  <div className="w-full md:w-1/3 p-3">
                    <p className="text-sm text-coolGray-800 font-semibold">
                      Subject
                    </p>
                  </div>
                  <div className="w-full md:flex-1 p-3">
                    <input
                      className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      placeholder="Add the Subject"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-lg font-bold border-b border-coolGray-100 pb-2 pt-6">
              Quiz Data
            </h1>
            {quizData.map((data, index) => (
          <div key={index}>
                <div className="py-6 border-b border-coolGray-100">
                  <div className="w-full md:w-9/12">
                    <div className="flex flex-wrap justify-between -m-3">
                      <div className="w-full md:w-1/3 p-3">
                        <p className="text-lg text-coolGray-800 font-semibold">
                          Quiz Question {index + 1}
                        </p>
                      </div>
                      {index !== 0 && (
                        <div
                          className="w-full md:w-auto p-3"
                          onClick={() => deleteQuizData(index)}
                        >
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="Red"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-6 border-b border-coolGray-100">
                  <div className="w-full md:w-9/12">
                    <div className="flex flex-wrap -m-3">
                      <div className="w-full md:w-1/3 p-3">
                        <p className="text-sm text-coolGray-800 font-semibold">
                          Question
                        </p>
                      </div>
                      <div className="w-full md:flex-1 p-3">
                        <input
                          className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                          placeholder="Enter the question"
                          type="text"
                          value={data.question}
                          onChange={(e) => handleQuestionChange(index, e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {[1, 2, 3, 4].map((optionIndex) => (
                  <div className="py-6" key={optionIndex}>
                    <div className="w-full md:w-9/12">
                      <div className="flex flex-wrap -m-3">
                        <div className="w-full md:w-1/3 p-3">
                          <p className="text-sm text-coolGray-800 font-semibold">
                            Option {optionIndex}
                          </p>
                        </div>
                        <div className="w-full md:flex-1 p-3">
                          <input
                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                            placeholder={`Option ${optionIndex}`}
                            type="text"
                            value={data[`option${optionIndex}`]}
                            onChange={(e) =>
                              handleOptionChange(index, optionIndex, e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="py-6 flex justify-between">
              <button
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                onClick={addQuizData}
              >
                Add Quiz Data
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
