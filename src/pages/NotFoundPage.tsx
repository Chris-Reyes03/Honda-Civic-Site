import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      
      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
          Lost in space?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Take Me Home
        </Link>
      </div>

      <div className="mt-12 w-full max-w-md">
        {/* Optional: Add a simple SVG illustration here */}
        <svg className="w-full h-auto text-indigo-200" fill="currentColor" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.5,-31.3,86.7,-15.7,85.2,-0.9C83.7,13.9,77.5,27.8,68.9,40.1C60.3,52.4,49.2,63.1,36.2,70.5C23.2,77.9,8.3,82,-6.4,80.7C-21.1,79.4,-35.6,72.7,-48.2,63.4C-60.8,54.1,-71.5,42.2,-77.8,28.4C-84.1,14.6,-86,1.1,-83.5,-12.3C-81,-25.7,-74.1,-39.1,-63.9,-50.2C-53.7,-61.3,-40.2,-70.1,-26.4,-77.2C-12.6,-84.3,1.5,-89.7,15.6,-87.2C29.7,-84.7,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;