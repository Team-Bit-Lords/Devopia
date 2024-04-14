"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const students = [
    {
      name: "Elena Rodriguez",
      score: 9500,
    },
    {
      name: "Liam Johnson",
      score: 8800,
    },
    {
      name: "Sophia Lee",
      score: 1100,
    },
    {
      name: "Oliver Martinez",
      score: 1300,
    },
    {
      name: "Emma Kim",
      score: 1400,
    },
    {
      name: "William Park",
      score: 1450,
    },
    {
      name: "Ava Hernandez",
      score: 1550,
    },
    {
      name: "James Nguyen",
      score: 1200,
    },
    {
      name: "Charlotte Smith",
      score: 1370,
    },
    {
      name: "Michael Brown",
      score: 1600,
    },
    {
      name: "Amelia Taylor",
      score: 1650,
    },
    {
      name: "Daniel Wilson",
      score: 1770,
    },
    {
      name: "Isabella Garcia",
      score: 1800,
    },
    {
      name: "Benjamin Lewis",
      score: 1350,
    },
    {
      name: "Mia Davis",
      score: 1470,
    },
    {
      name: "Alexander Clark",
      score: 1270,
    },
    {
      name: "Ethan Rodriguez",
      score: 1270,
    },
    {
      name: "Sophia Anderson",
      score: 1370,
    },
    {
      name: "Olivia Martinez",
      score: 1470,
    },
  ];
  const sortedStudents = students.slice().sort((a, b) => b.score - a.score);

  const shades = ["bg-blue-300", "bg-blue-200", "bg-blue-100"];

  const getRankAndData = (studentName) => {
    const student = sortedStudents.find((s) => s.name === studentName);
    if (!student) return null;

    const index = sortedStudents.findIndex((s) => s.name === studentName);
    const rank = index !== -1 ? index + 1 : null;

    return {
      name: student.name,
      score: student.score,
      rank: rank,
    };
  };
  const Data = getRankAndData("Ethan Rodriguez");

  return (
    <div className="h-full ">
      <p className="text-2xl font-bold mb-4">Leaderboard</p>
      <div className="flex justify-between items-center mb-4 mr-4">
        <div>
          Points:{" "}
          <span className="text-blue-500 font-semibold"> {Data?.score}</span>
        </div>
        <div>
          Rank:{" "}
          <span className="text-blue-500 font-semibold">{Data?.rank}</span>
        </div>
        <button
          className="p-2 px-4 bg-blue-500 rounded-lg text-white"
          onClick={() => {
            router.push("/student/redeem");
          }}
        >
          Redeem
        </button>
      </div>
      <div className="w-full h-[90%] rounded-lg border border-gray-200 bg-white shadow-sm overflow-y-scroll">
        <div className="grid w-full grid-cols-3 items-center p-4">
          <div className="font-semibold">Rank</div>
          <div className="font-semibold">User</div>
          <div
            className="font-semibold text-right"

          >
            Score
          </div>
        </div>
        <div className="divide-y">
          {sortedStudents.map((student, index) => (
            <div
              className={`grid w-full grid-cols-3 items-center p-4 ${
                index < 3 ? shades[index] : ""
              }`}
              key={index}
            >
              <div className="col-span-1 flex gap-3">
                <div>{index + 1}</div>
                {index == 0 && (
                  <div className="flex justify-center w-full">
                    <div className="rounded-full bg-green-600 text-white w-12 h-full text-center font-bold">
                      # 1
                    </div>
                  </div>
                )}
                {index == 1 && (
                  <div className="flex justify-center w-full">
                    <div className="rounded-full bg-green-500 text-white w-12 h-full text-center font-bold">
                      # 2
                    </div>
                  </div>
                )}
                {index == 2 && (
                  <div className="flex justify-center w-full">
                    <div className="rounded-full bg-green-400 text-white w-12 h-full text-center font-bold">
                      # 3
                    </div>
                  </div>
                )}
              </div>
              <div className="font-semibold col-span-1">{student.name}</div>
              <div className="text-right col-span-1">{student.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
