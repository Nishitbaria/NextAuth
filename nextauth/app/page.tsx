"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Next Auth Project</h1>
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
