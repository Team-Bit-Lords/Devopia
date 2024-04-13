"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
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

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const update_attendance = async () => {
    console.log(email, date, status)
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/teacher/update_attendance",
      {
        email: email,
        date: date,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/teacher/get_students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.body);
      setStudents(response.data.body);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-center items-center text-xl font-semibold">
          Attendance
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box h-[400px]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add Attendance</h3>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2 mt-2">
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
                      value={date}
                      onChange={(selectedDate) => setDate(selectedDate)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <span className="label-text">Status</span>
                <select
                  className="input input-bordered"
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <button
                className="btn btn-primary mt-16"
                onClick={update_attendance}
              >
                Update Attendance
              </button>
            </div>
          </div>
        </dialog>
      </div>
      {students &&
        students.length > 0 &&
        students.map((student, index) => {
          return (
            <div className="my-2" key={index}>
              <div className="group mx-2 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mr-auto">
                <a
                  href="#"
                  className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
                >
                  <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={
                        "https://live.staticflickr.com/3868/14566055790_f191cb7ba5_b.jpg"
                      }
                      alt=""
                      width={100}
                      height={100}
                      className="h-full w-full object-cover text-gray-700"
                    />
                  </div>
                </a>
                <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                  <h3 className="text-sm text-gray-600">{student.email}</h3>
                  <a
                    href="#"
                    className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                  >
                    {" "}
                    {student.name}
                  </a>
                  <button
                    className="btn btn-primary ml-auto"
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                      setEmail(student.email);
                    }}
                  >
                    Add Attendance
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AttendancePage;
