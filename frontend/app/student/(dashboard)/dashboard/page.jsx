import Subject from "@/components/Student_Components/Subject";
import React from "react";

const StudentDashboard = () => {
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
