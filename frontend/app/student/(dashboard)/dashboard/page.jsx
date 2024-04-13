"use client";
import Subject from "@/components/Student_Components/Subject";
import React, { useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
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
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between py-4 border-b md:flex">
          <div>
            <h3 className="text-gray-800 text-2xl mb-4 font-bold">DashBoard</h3>
          </div>
        </div>
        <Subject />
      </div>
    </div>
  );
};

export default StudentDashboard;
