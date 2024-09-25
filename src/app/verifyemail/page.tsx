"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/navbar";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUsermail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("USer verified")
    } catch (err: any) {
      setError(true);
      console.log(err.message);
      toast.error("Issue in verifying User")
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUsermail();
    } else {
      setError(true);
    }
  }, [token]);

  return (
    <div>
      <Toaster/>
      <Navbar />
      <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
        <div className="flex justify-center text-2xl font-bold">
          Verify Mail
        </div>

        <div>
          <h1>{token}</h1>
          {verified && (
            <div>
              <Link href="/login">
                {" "}
                <button
                  className="rounded-full bg-blue-700 px-3 py-1"
                  disabled={error}
                >
                  U can go to login
                </button>
              </Link>
            </div>
          )}
          {error && <div>Some error occurred</div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
