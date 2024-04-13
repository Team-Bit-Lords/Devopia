import React from "react";

const Subject = ({name,image}) => {
  return (
    <div className="w-64">
      <a href="#" title className="block aspect-w-4 aspect-h-3">
        <img
          className="object-cover w-full h-full"
          src={image}
          alt
        />
      </a>
      <span className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-rose-500 bg-rose-100 mt-2">
        {name}
      </span>
      <p className="mt-2 text-xl font-semibold">
        <a href="#" title className="text-black">
          {" "}
          How to mange your remote team?{" "}
        </a>
      </p>
    </div>
  );
};

export default Subject;
