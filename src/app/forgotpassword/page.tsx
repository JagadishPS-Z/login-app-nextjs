"use client"
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const ForgotPassword = () => {
const [email,setEmail]=useState("")
async function onForgotPassword(){
        try{
                const response=await axios.post("/api/users/forgotpassword",{email})
                toast.success("Forgot password email sent");
        }
        catch(err:any){
                console.log("Error occurend in Forgot Password"+err.message)
        }
}
  return (
        <div>
      <Toaster />

      <Navbar />
      <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
        <div className="flex flex-row space-x-10">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value );
            }}
            className="text-black px-4 rounded-xl"
          />
        </div>
        <div className="flex flex-row space-x-10">
          <button
            className="rounded-full bg-blue-700 px-3 py-1"
            onClick={onForgotPassword}
          >
            Send Mail
          </button>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword