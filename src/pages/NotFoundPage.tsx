import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 py-20 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>

      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-zinc-100 md:text-4xl">
          Lost in space?
        </h2>
        <p className="mt-4 text-lg text-zinc-100">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-block rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
