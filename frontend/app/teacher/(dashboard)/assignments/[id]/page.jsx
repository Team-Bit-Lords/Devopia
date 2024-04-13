"use client";
import React, { useEffect } from "react";

const page = (data) => {
  console.log(data.params.id);
  const [uploaded, setUploaded] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/teacher/get_assignment/${data.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.body);
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
            {uploaded.length > 0 &&
              uploaded.map((data, index) => {
                <div className="flex flex-col gap-2 mt-8" key={index}>
                  <iframe src={data.assignment} frameborder="0"></iframe>
                </div>;
              })}
          </div>
        </dialog>
      </div>
      {assignments.map((assignment, index) => {
        return (
          <div className="my-2" key={index}>
            <div className="group mx-2 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mr-auto">
              <a
                href="#"
                className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
              >
                <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={image}
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

                <div className="mt-5 flex flex-col justify-between space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                  <div className="">
                    Teacher:
                    <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                      {" "}
                      {assignment.teacher}
                    </span>
                  </div>
                  {!pathname || !pathname.includes("teacher") ? (
                    <button className="btn btn-primary">
                      Upload Assignment
                    </button>
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

export default page;
