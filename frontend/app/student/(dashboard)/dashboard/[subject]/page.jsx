"use client";
import { React, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { sub } from "date-fns";
// import { headers } from "next/headers";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      const response = await axios
        .post(
          "http://127.0.0.1:5000/api/student/subject_videos",
          {
            subject: params.subject,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data);
      setCourseData(response.body);
      setLoading(false);
    })();
  }, []);

  const [courseData, setCourseData] = useState([
    {
      topic: "",
      video: "",
      description: "",
    },
  ]);

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col w-full h-full gap-4 p-6 bg-gray-200 shadow-xl rounded-xl sm:h-screen ">
          <div className="px-2 text-xl font-bold">Modules</div>
          {!loading && (
            <div className="xs:flex xs:flex-col sm:flex md:grid-cols-3 md:grid lg:grid grid-cols-3 gap-8 md:h-[30rem] lg:h-[35rem] ">
              <div className="flex flex-col flex-wrap items-center justify-between mt-1 lg:col-span-2 md:col-span-2">
                <div className="w-full overflow-hidden rounded-lg ">
                  <iframe
                    src={`${courseData[selectedVideoIndex].video}?controls=0`}
                    width={"100%"}
                    height="auto"
                    className=" aspect-video"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>
                <div className="w-full px-2 text-lg font-semibold text-blue-700">
                  <h1>{courseData[selectedVideoIndex].topic}</h1>
                </div>
              </div>

              <div className="lg:flex flex-col  items-start col-span-1 gap-3 w-full h-[15rem] md:grid md:grid-cols-1 lg:h-full overflow-y-scroll overflow-x-hidden rounded-lg">
                {courseData.map((course, index) => (
                  <div
                    key={index}
                    className={`flex gap-8 sm:h-full lg: md:col-span-1 md:h-[100%] lg:h-auto rounded-lg items-center justify-start lg:w-full  ${
                      selectedVideoIndex === index
                        ? "bg-white shadow-xl border-2"
                        : "bg-gray-300 shadow-md"
                    }`}
                    onClick={() => handleVideoClick(index)}
                  >
                    <div className="w-3/6 p-2 bg-transparent ">
                      <img
                        className={`rounded-lg overflow-hidden relative z-0 w-full h-full `}
                        src={`https://img.youtube.com/vi/${course.video
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
                        {course.topic}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-3 px-2 mt-2 mb-2">
                {courseData[selectedVideoIndex].description}
              </div>

              <div className="flex items-center justify-center col-span-3">
                <div
                  className="flex items-center justify-center p-4 px-6 font-bold text-white bg-blue-400 rounded-full cursor-pointer "
                  onClick={() =>
                    router.push(
                      `${params.subject + "/" + courseData[selectedVideoIndex].topic
                        .split(" ")
                        .join("")}`,
                    )
                  }
                >
                  Give Quiz on {courseData[selectedVideoIndex].topic}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
