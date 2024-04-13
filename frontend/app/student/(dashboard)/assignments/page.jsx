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
import image from "@/public/assignment.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
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
      if (response?.data) {
        setAssignments(response?.data?.body?.assignments);
        console.log("first");
        document.getElementById("my_modal_3").close();
      }
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
      console.log(response.data.body);
      // setAssignments([...assignments, response.data.body.assignments]);
    } else {
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center text-xl font-semibold">
          Assignments
        </div>
        {pathname && pathname.includes("teacher") && (
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Add Assignment
          </button>
        )}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-[600px]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Add Assignment</h3>
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
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
                className="w-full max-w-lg input input-bordered"
                onChange={onChange}
                name="subject"
              />

              <span className="label-text">Topic</span>
              <input
                type="text"
                placeholder="Type here"
                className="w-full max-w-lg input input-bordered"
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
                name="description"
              />
            </div>
            {pathname && pathname.includes("teacher") ? (
              <button className="mt-8 btn" onClick={add_assignment}>
                {" "}
                Add Assignment
              </button>
            ) : (
              <></>
            )}
          </div>
        </dialog>
      </div>
      {assignments.map((assignment, index) => {
        return (
          <div className="my-2" key={index}>
            <div className="grid max-w-screen-md grid-cols-12 py-8 mx-2 mt-5 space-x-8 overflow-hidden text-gray-700 transition border rounded-lg shadow group hover:shadow-lg sm:mr-auto">
              <a
                href="#"
                className="order-2 col-span-1 mt-4 text-left text-gray-600 -ml-14 hover:text-gray-700 sm:-order-1 sm:ml-4"
              >
                <div className="relative w-16 h-16 overflow-hidden rounded-lg group">
                  <Image
                    src={image}
                    alt=""
                    className="object-cover w-full h-full text-gray-700"
                  />
                </div>
              </a>
              <div className="flex flex-col col-span-11 pr-8 text-left sm:pl-4">
                <h3 className="text-sm text-gray-600">{assignment.subject}</h3>
                <a
                  href="#"
                  className="mb-3 overflow-hidden text-lg font-semibold pr-7 sm:text-xl"
                >
                  {" "}
                  {assignment.name}
                </a>
                <p className="overflow-hidden text-sm pr-7">
                  {assignment.description}
                </p>

                <div className="flex flex-col justify-between mt-5 space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                  <div className="">
                    Teacher:
                    <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                      {" "}
                      {assignment.teacher}
                    </span>
                  </div>
                  {!pathname || !pathname.includes("teacher") ? (
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          document.getElementById("modal_4").showModal()
                        }
                      >
                        Upload Assignment
                      </button>
                      <dialog id="modal_4" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="text-lg font-bold">
                            Upload Assignment
                          </h3>
                          <div>
                            <input
                              type="file"
                              accept=".pdf"
                              placeholder="Type here"
                              className="w-full max-w-lg input input-bordered"
                              onChange={onChange}
                              name="subject"
                            />
                          </div>
                        </div>
                      </dialog>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        router.push(`/teacher/assignments/${assignment.id}`)
                      }
                    >
                      View Assignment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentsPage;
