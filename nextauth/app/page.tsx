import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
            NextJS Auth App with Tailwind CSS
          </p>
          <h1 className="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
            This is a NextJS app with Tailwind CSS and NextAuth.js for
            authentication. It is a simple and easy to use app that you can use
            to build your own app.
          </h1>
          <div className="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
            <Link
              href="/Signup"
              title=""
              className="mb-3 sm:mb-0 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Sign up for free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-gray-900 hover:text-white transition-all duration-200 bg-gray-100 border-2 border-gray-900 sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
