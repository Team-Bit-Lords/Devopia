"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const PatientProfile = () => {
  const [modal, setModal] = useState(false);
  const [tableItems,setTableItems] = useState([]);

  // const tableItems = [
  //   {
  //     subject: "Math",
  //     question: "What is the integral of x^2?",
  //     yourAnswer: "1/3*x^3 + C",
  //     correctAnswer: "1/3*x^3 + C",
  //   },
  //   {
  //     subject: "Physics",
  //     question: "What is the second law of thermodynamics?",
  //     yourAnswer: "Energy",
  //     correctAnswer: "Entropy",
  //   },
  //   {
  //     subject: "Chemistry",
  //     question: "What is the chemical formula for table salt?",
  //     yourAnswer: "NaCl",
  //     correctAnswer: "NaCl",
  //   },
  //   {
  //     subject: "Biology",
  //     question: "What is the process by which plants make food called?",
  //     yourAnswer: "Chlorophyll",
  //     correctAnswer: "Photosynthesis",
  //   },
  // ];
  // let tableItems = [];
  const quizData = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://127.0.0.1:5000/api/student/previous_quizzes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      const quizzes = res.data.body.flatMap((subjectItem) =>
        subjectItem.quiz.map((quizItem) => ({
          subject: subjectItem.subject,
          question: quizItem.question,
          yourAnswer: quizItem.answer,
          correctAnswer: quizItem.correct,
        }))
      );
      setTableItems(quizzes);
    }
    console.log(res);
  };

  // const tableItems = quiz.map((quizItem) => ({
  //   subject: data.data.body[0].subject,
  //   question: quizItem.question,
  //   yourAnswer: quizItem.answer,
  //   correctAnswer: quizItem.options[quizItem.correct],
  // }));

  useEffect(() => {
    quizData();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-white justify-between flex p-5 h-[170px] rounded-xl">
        <div className="gap-5 flex">
          <div className="">
            <img
              className="rounded-lg w-[130px] h-[130px]"
              src="https://res.cloudinary.com/dp9kpxfpa/image/upload/v1703072051/la2oc42jnc7ldazqgwv1.jpg"
              alt="profile"
            />
          </div>
          <div className="flex gap-1 text-[#01010d] flex-col">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-xl">
                {localStorage.getItem("studentName")}
              </p>
              <div className="bg-gray-100 p-1 rounded-full">
                <Link href="/">
                  <IoCallOutline />
                </Link>
              </div>
              <div className="bg-gray-100 p-1 rounded-full">
                <Link href="/">
                  <IoMailOutline />
                </Link>
              </div>
            </div>
            <div className="flex text-xs gap-3">
              <p className="gap-1 font-medium flex items-center">
                <IoMdPerson />
                <span className="text-[#93949c] font-semibold">male</span>
              </p>
              <p className="gap-1 font-medium flex items-center">
                <FaLocationDot />
                <span className="text-[#93949c] font-semibold">virar</span>
              </p>
              <p className="gap-1 font-medium flex items-center">
                <BsFillCalendarDateFill />
                <span className="text-[#93949c] font-semibold">12/12/2006</span>
              </p>
            </div>
            <div className="flex gap-4  mt-4">
              <div className="flex border-[2px] border-[#f7f5f5] px-3 py-1 pr-6 rounded-lg flex-col">
                <p className="text-lg font-semibold">
                  77{" "}
                  <span className="text-sm text-[#93949c] font-semibold">
                    %
                  </span>
                </p>
                <p className="text-[12px] text-[#b5b5b5] font-semibold">
                  Attendance
                </p>
              </div>
              <div className="flex border-[2px]  border-[#f7f5f5] px-3 py-1 pr-6 rounded-lg flex-col">
                <p className="text-lg font-semibold">
                  4260
                  <span className="text-sm text-[#93949c] ml-1 font-semibold">
                    pt
                  </span>
                </p>
                <p className="text-[12px] text-[#b5b5b5] font-semibold">
                  Score
                </p>
              </div>
              <div className="flex border-[2px]  border-[#f7f5f5] px-3 py-1 pr-6 rounded-lg flex-col">
                <p className="text-lg font-semibold">
                  {/* {calculateAge(patient.dob)} */}16
                </p>
                <p className="text-[12px] text-[#b5b5b5] font-semibold">Age</p>
              </div>
              <div className="flex border-[2px]  border-[#f7f5f5] px-3 py-1 pr-6 rounded-lg flex-col">
                <p className="text-lg font-semibold">10</p>
                <p className="text-[12px] text-[#b5b5b5] font-semibold">
                  Class
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-1 py-1 px-3 font-semibold rounded-md border-black border-[2px]"
          >
            <FaRegEdit /> Edit{" "}
          </button>
        </div>
      </div>
      <div className="mt-5 ">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start bg-white py-4 px-4 rounded justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Past Quizzes
              </h3>
            </div>
            <div className="mt-3 md:mt-0">
              <a
                href="javascript:void(0)"
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Attempt quiz
              </a>
            </div>
          </div>
          <div className="mt-12 bg-white shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Subject</th>
                  <th className="py-3 px-6">Question</th>
                  <th className="py-3 px-6">Your answer</th>
                  <th className="py-3 px-6">Correct answer</th>
                  {/* <th className="py-3 px-6"></th> */}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {tableItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.question}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold whitespace-nowrap ${
                        item.yourAnswer === item.correctAnswer
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {item.yourAnswer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.correctAnswer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
