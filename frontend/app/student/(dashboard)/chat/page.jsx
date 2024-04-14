"use client";
import React, { useState } from "react";
import axios from "axios";
const page = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");
  const [subject, setSubject] = useState("");
  const handleSelect = (value) => {
    setSelectedValue(value);
  };
  const handle_chat = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/student/chatbot/history",
      {
        question: message,
      }
    );
    const res = response.data.body;
    setMessages([...messages, message, res]);
    setMessage("");
  };
  return (
    <div className="flex h-[93vh] w-full flex-col">
      {messages.length === 0 ? (
        <div className="flex w-full h-full bg-slate-300 text-gray-400 justify-center items-center rounded">
          <p>Nothing Here!!! Ask a Question Maybe?😌</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-300 text-sm leading-6 text-slate-900 shadow-md  sm:text-base sm:leading-7 rounded">
          {messages.map((msg, index) => {
            return index % 2 === 0 ? (
              <div
                className="flex flex-row-reverse px-4 py-8 sm:px-6"
                key={index}
              >
                <img
                  className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                  src="https://dummyimage.com/256x256/363536/ffffff&text=U"
                />

                <div className="flex max-w-3xl items-center mx-4">
                  <p>{msg}</p>
                </div>
              </div>
            ) : (
              <div className="flex bg-slate-100 px-4 py-8  sm:px-6" key={index}>
                <img
                  className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                  src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
                />

                <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between">
                  <p className="max-w-3xl">
                    {msg.split("*").join("").split("#").join("")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt message input */}
      <form className="flex w-full items-center rounded-b-md border-t border-slate-300 bg-slate-200 p-2 ">
        <label htmlFor="chat" className="sr-only">
          Enter your prompt
        </label>
        <div className="flex justify-center mr-4">
          <select
            className="hover:text-blue-600 sm:p-2 outline-none rounded"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="option1">Select</option>
            <option value="option2">History</option>
            <option value="option2">Science</option>
            <option value="option2">English</option>
            <option value="option2">Geography</option>
            <option value="option2">Maths</option>
          </select>
        </div>
        <textarea
          id="chat-input"
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={selectedValue === "option1"}
          className={`${
            selectedValue === "option1"
              ? "cursor-not-allowed hover:cursor-not-allowed"
              : " cursor-default"
          }mx-2 flex min-h-full w-full rounded-md border border-slate-300 bg-slate-50 p-2 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 `}
          placeholder="Enter your prompt"
        ></textarea>
        <div>
          <button
            onClick={(e) => handle_chat(e)}
            className="inline-flex hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-600 sm:p-2"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              aria-hidden="true"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="black"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 14l11 -11"></path>
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
