"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import pdf_data from "@/assignment_2.pdf";
const page = (data) => {
  console.log(data.params.id);
  const [uploaded, setUploaded] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.137.177:5000/api/teacher/get_assignment/${data.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        // console.log(response.data);
      setUploaded(response.data.body.uploaded);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-center items-center text-xl font-semibold">
          Uploaded Assignments
        </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-[600px]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Assignment</h3>
            {/* {uploaded.length > 0 &&
              uploaded.map((data, index) => {
                <div className="flex flex-col gap-2 mt-8" key={index}>
                  <iframe src={data.assignment} frameborder="0"></iframe>
                </div>;
              })} */}
          </div>
        </dialog>
      </div>
      {uploaded.length > 0 ? (
        uploaded.map((data, index) => {
          return (
            <div className="flex flex-col gap-2 mt-8" key={index}>
              <div>{data.name}</div>
              <p>oqkeofdnwefbweoifhwo</p>
              {/* <iframe src={pdf_data} frameborder="0"></iframe> */}
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center text-xl font-semibold mt-24">
          No Assignments Uploaded
        </div>
      )}
    </div>
  );
};

export default page;
