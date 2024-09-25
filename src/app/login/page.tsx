"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Loginpage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  async function onLogin() {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Logged in suxxess", response.data);
      toast.success("Logged in");
      setTimeout(() => {
        router.push("/profile");

      }, 2000)

    } catch (err: any) {
      console.log("Error occurred during login" + err.message);
    }
  }
  return (
    <div>
      <Toaster />

      <Navbar />
      <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
      <div className="flex justify-center text-2xl font-bold">
        Login page
      </div>
        <div className="flex flex-row space-x-10">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={(e) => {
              setuser({ ...user, email: e.target.value });
            }}
            className="text-black px-4 rounded-xl"
          />
        </div>
        <div className="flex flex-row space-x-10">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={(e) => {
              setuser({ ...user, password: e.target.value });
            }}
            className=" text-black px-4 rounded-xl"
          />
        </div>
        <div className="flex flex-row space-x-10">
          <button
            className="rounded-full bg-blue-700 px-3 py-1"
            onClick={onLogin}
            disabled={buttonDisable}
          >
            {loading ? "Signing In" : "Login"}
          </button>
          <button
            className="rounded-full bg-blue-700 px-3 py-1"
          >
            <Link href="/signup"> Sign Up</Link>
          </button>
          <button
            className="rounded-full bg-blue-700 px-3 py-1"

          >
            <Link href="/forgotpassword"> Forgot Password</Link>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
