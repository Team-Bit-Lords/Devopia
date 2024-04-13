"use client";
import { React, useState } from "react";

const page = () => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const [courseData, setCourseData] = useState([
    {
      courseName: "Course 1",
      courseDescription: "Description 1",
      courseImage: "Image 1",
      courseVideo:
        "https://www.youtube.com/embed/DsZ3yLWGYy4?si=FSw90FbRbfAPfF7v&amp;controls=0",
    },
    {
      courseName: "Course 2",
      courseDescription: "Description 2",
      courseImage: "Image 2",
      courseVideo:
        "https://www.youtube.com/embed/JcxVoV1ah78?si=u2AYUnuMzFYsgwao&amp;",
    },
    {
      courseName: "Course 3",
      courseDescription: "Description 3",
      courseImage: "Image 3",
      courseVideo:
        "https://www.youtube.com/embed/JcxVoV1ah78?si=u2AYUnuMzFYsgwao&amp;",
    },
    {
      courseName: "Course 4",
      courseDescription:
        "Description 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo",
      courseImage: "Image 4",
      courseVideo:
        "https://www.youtube.com/embed/JcxVoV1ah78?si=u2AYUnuMzFYsgwao&amp;",
    },
  ]);

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <>
      <div className="flex flex-wrap w-screen h-screen justify-center items-center">
        <div className="flex flex-col gap-8 shadow-xl rounded-xl p-6 border border-gray-100 h-auto w-5/6 bg-gray-100">
          <div className="px-2 text-xl font-bold">Modules</div>
          <div className=" grid grid-cols-3 gap-8">
            <div className="flex flex-col col-span-2 flex-wrap justify-center items-center gap-4">
              <div className="w-[50rem] h-[25rem] rounded-lg overflow-hidden ">
                <iframe
                  src={`${courseData[selectedVideoIndex].courseVideo}`}
                  width={"100%"}
                  height={"100%"}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
              <div className="w-full px-2 text-lg font-semibold text-blue-700">
                <h1>{courseData[selectedVideoIndex].courseName}</h1>
              </div>
            </div>
            <div className="flex flex-col flex-wrap items-start col-span-1 gap-3 w-full">
              {courseData.map((course, index) => (
                <div
                  key={index}
                  className={`flex gap-8 h-28 rounded-lg items-center justify-start w-full  ${
                    selectedVideoIndex === index
                      ? "bg-white shadow-xl"
                      : "bg-gray-100 shadow-md"
                  }`}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className=" h-full w-44 bg-transparent p-2">
                    <img
                      className="rounded-lg overflow-hidden relative z-0 w-full h-full"
                      src={`https://img.youtube.com/vi/${course.courseVideo
                        .split("/")
                        .pop()
                        .split("?")
                        .shift()}/maxresdefault.jpg`}
                      alt="Thumbnail"
                    />
                  </div>
                  <div className="flex justify-center">
                    <h1 className=" px-6 font-medium text-blue-700">
                      {course.courseName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-3 px-2">
              {courseData[selectedVideoIndex].courseDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
