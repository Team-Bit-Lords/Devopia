"use client";
import { React, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const [courseData, setCourseData] = useState([
    {
      courseName: "Maths",
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
      courseName: "Course 4 Description 4",
      courseDescription:
        "Description 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo",
      courseImage: "Image 4",
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
    {
      courseName: "Course 5",
      courseDescription:
        "Description 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo",
      courseImage: "Image 5",
      courseVideo:
        "https://www.youtube.com/embed/JcxVoV1ah78?si=u2AYUnuMzFYsgwao&amp;",
    },
    
  ]);

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <>
      <div className=" ">
        <div className="flex flex-col gap-4 shadow-xl rounded-xl p-6 sm:h-screen h-full w-full bg-gray-200 ">
          <div className="px-2 text-xl font-bold">Modules</div>
          <div className="xs:flex xs:flex-col sm:flex md:grid-cols-3 md:grid lg:grid grid-cols-3 gap-8 md:h-[30rem] lg:h-[35rem] ">
            <div className="flex flex-col lg:col-span-2 md:col-span-2 flex-wrap justify-between items-center mt-1">
              <div className="w-full rounded-lg overflow-hidden ">
                <iframe
                  src={`${courseData[selectedVideoIndex].courseVideo}`}
                  width={"100%"}
                  height="auto"
                  className=" aspect-video"
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

            <div className="lg:flex flex-col  items-start col-span-1 gap-3 w-full h-[15rem] md:grid md:grid-cols-1 lg:h-full overflow-y-scroll overflow-x-hidden rounded-lg">
              {courseData.map((course, index) => (
                <div
                  key={index}
                  className={`flex gap-8 sm:h-full lg: md:col-span-1 md:h-[100%] lg:h-full rounded-lg items-center justify-start lg:w-full  ${
                    selectedVideoIndex === index
                      ? "bg-white shadow-xl border-2"
                      : "bg-gray-300 shadow-md"
                  }`}
                  onClick={() => handleVideoClick(index)}
                >
                  <div className=" h-full w-3/6 bg-transparent p-2">
                    <img
                      className={`rounded-lg overflow-hidden relative z-0 w-full h-full `}
                      src={`https://img.youtube.com/vi/${course.courseVideo
                        .split("/")
                        .pop()
                        .split("?")
                        .shift()}/maxresdefault.jpg`}
                      alt="Thumbnail"
                    />
                  </div>
                  <div className="flex justify-start w-2/6">
                    <h1
                      className={` ${
                        selectedVideoIndex === index
                          ? "text-blue-700"
                          : "text-gray-500"
                      }`}
                    >
                      {course.courseName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-3 px-2 mb-2 mt-2">
              {courseData[selectedVideoIndex].courseDescription}
            </div>

            <div className="flex justify-center items-center col-span-3">
              <div
                className=" bg-blue-400 rounded-full flex justify-center items-center p-4 px-6 text-white font-bold cursor-pointer"
                onClick={() => router.push(`/student/dashboard/${courseData[selectedVideoIndex].courseName.split(' ').join('')}/quiz`)}
              >
                Give Quiz on {courseData[selectedVideoIndex].courseName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
