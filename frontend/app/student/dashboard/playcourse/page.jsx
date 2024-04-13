"use client"
import { React, useState } from "react";

const page = () => {
  const [courseData, setCourseData] = useState([
    {
      courseName: "",
      courseDescription: "",
      courseImage: "",
      courseVideo: "",
    },
  ]);

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        {courseData.map((course, index) => (
          <div className=" shadow-2xl ">
            <iframe></iframe>
            <h1>{course.courseName}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
