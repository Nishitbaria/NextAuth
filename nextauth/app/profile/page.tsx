"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const userData = JSON.parse(userDetails);
      setData(userData._id);
    } else {
      getUserDetails();
    }
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      localStorage.removeItem("user"); // Clear user data from localStorage on logout
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/user/me");
      toast.success("User details fetched");
      localStorage.setItem("user", JSON.stringify(res.data.data)); // Save fetched data to localStorage
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Profile
        </h1>
        <hr className="my-4" />
        <p className="text-center text-gray-600">Profile page</p>
        <div className="mt-4 p-2 rounded bg-green-500 text-white text-center">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>
              {" "}
              {localStorage.getItem("user") && (
                <p>{JSON.parse(localStorage.getItem("user")!)._id}</p>
              )}
            </Link> // Corrected syntax for dynamic route
          )}
        </div>
        <hr className="my-4" />
        <div className="flex flex-col space-y-4">
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            GetUser Details
          </button>
        </div>
      </div>
    </div>
  );
}
