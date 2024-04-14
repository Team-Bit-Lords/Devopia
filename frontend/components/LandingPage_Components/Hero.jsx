import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100">
      <header className>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title className="flex">
                <p className="font-bold text-2xl">Learn Smart</p>
              </a>
            </div>
            <button
              type="button"
              className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <Link href="/student/login">
                <button className="btn bg-blue-500 text-white text-md hover:text-black">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                Empowering education with
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]" />
                  <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                    Learn Smart
                  </h1>
                </div>
              </h1>
              <p className="mt-8 text-base text-black sm:text-xl">
                Offer minimal disruption without sacrificing quality, ensuring
                each student receives the attention they deserve. Promote
                effective collaboration, engaging every participant. Excellence
                through commitment.
              </p>
              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <Link
                  href="/student/login"
                  title
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-500 hover:bg-blue-500 focus:bg-blue-600"
                  role="button"
                >
                  {" "}
                  Get Started{" "}
                </Link>
              </div>
            </div>
            <div>
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                alt
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
