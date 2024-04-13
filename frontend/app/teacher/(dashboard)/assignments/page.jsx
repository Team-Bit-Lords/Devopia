"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    subject: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    print(token);
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/teacher/get_assignments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.body.assignments);
      if (response.status === 200) setAssignments(response?.data?.body?.assignments);
      else setAssignments([]);
    };
    fetchData();
  }, []);

  const add_assignment = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/teacher/add_assignment",
      {
        name: formData.topic,
        description: formData.description,
        subject: formData.subject,
        due_date: date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setAssignments([...assignments, response.data.body.assignment]);
    } else {

    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-center items-center text-xl font-semibold">
          Assignments
        </div>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Assignment
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-[600px]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add Assignment</h3>
            <div className="flex flex-col gap-2 mt-8">
              <span className="label-text">Due Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => setDate(e.target.value)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="label-text">Subject</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-lg"
                onChange={onChange}
                name="subject"
              />

              <span className="label-text">Topic</span>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-lg"
                onChange={onChange}
                name="topic"
              />
              <span className="label-text">Description</span>
              <textarea
                rows={4}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-lg h-[120px]"
                onChange={onChange}
                name="subject"
              />
            </div>
            <button className="btn mt-8" onClick={add_assignment}>
              {" "}
              Add Assignment
            </button>
          </div>
        </dialog>
      </div>
      {assignments &&
        assignments.length > 0 &&
        assignments.map((assignment, index) => {
          <div className="my-2" key={index}>
            <div className="group mx-2 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mr-auto">
              <a
                href="#"
                className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
              >
                <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                  <img
                    src=""
                    alt=""
                    className="h-full w-full object-cover text-gray-700"
                  />
                </div>
              </a>
              <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                <h3 className="text-sm text-gray-600">{assignment.subject}</h3>
                <a
                  href="#"
                  className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                >
                  {" "}
                  {assignment.name}
                </a>
                <p className="overflow-hidden pr-7 text-sm">
                  {assignment.description}
                </p>

                <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                  <div className="">
                    Experience:
                    <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                      {" "}
                      2 Years{" "}
                    </span>
                  </div>
                  <div className="">
                    Salary:
                    <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                      180-250k
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>;
        })}
    </div>
  );
};

export default AssignmentsPage;
