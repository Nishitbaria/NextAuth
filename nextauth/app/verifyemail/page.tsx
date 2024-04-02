"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import Link from "next/link";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();

  async function verifyEmail(token: string) {
    try {
      const response = await axios.post("/api/user/verifyemail", { token });
      setMessage(response.data.message);
      setShowConfetti(true); // Show confetti on success
    } catch (error) {
      setMessage("An error occurred while verifying your email.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = searchParams.get("token");
    verifyEmail(token!);

    if (!token) {
      setMessage("No verification token found.");
      setLoading(false);
      return;
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Verifying your email...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {showConfetti && <Confetti />}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className="text-md">{message}</p>
        <Link href="/"> Go To Home Page</Link>
      </div>
    </div>
  );
}
