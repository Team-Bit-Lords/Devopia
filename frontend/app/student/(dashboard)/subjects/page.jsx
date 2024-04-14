"use client";
import Subject from "@/components/Student_Components/Subject";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const router = useRouter()
  const getData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:5000/api/student/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.data.message == "success") {
        const coursesData = res.data.body.map((course) => ({
          name: course.name,
          image: course.url,
        }));
        setCourses(coursesData);
      }
      console.log(courses);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
          <div>
            <h3 className="text-gray-800 text-2xl font-bold">DashBoard</h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-12">
          {courses.map((course, index) => (
            <div onClick={()=>{router.push(`dashboard/${course.name}`)}} key={index} className="w-64">
              <a href="#" title className="block aspect-w-4 aspect-h-3">
                <img
                  className="object-contain border-[10px] border-white rounded shadow-lg w-[400px] h-[250px]"
                  src={course.image}
                  alt={course.name}
                />
              </a>
              <span className="text-xl font-semibold flex justify-center items-center mt-2  ">{course.name}</span>
            </div>
          ))}
        </div>
        {/* <Subject /> */}
      </div>
    </div>
  );
};

export default StudentDashboard;
