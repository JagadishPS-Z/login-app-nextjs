"use client";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error,setError]=useState("")
  const[disabled,setDisabled]=useState(true)
  const router=useRouter()

  
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
useEffect(()=>{
  if(password.length>=8 && confirmPassword===password){
    setDisabled(false);
    setError("")
  }
  else{
    setError("Confirm Password and password are different");
    setDisabled(true)
  }
},[confirmPassword])

  async function onResetPassword() {
    try {
      await axios.post("/api/users/resetpassword", {token,password});
      toast.success("Password Reset Successfull");
      router.push("/login")
      
    } catch (err: any) {
      console.log("Some error occured in Reset Password", err.message);
      toast.error("Some error occured");
    }
  }
  return (
    <div>
      <Toaster />

      <Navbar />
      <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
      <div className="flex justify-center text-2xl font-bold">
        Reset Password
      </div>
        <div className="flex flex-row space-x-10">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-black px-4 rounded-xl"
          />
        </div>
        <div className="flex flex-row space-x-10">
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            placeholder="COnfirm Password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="text-black px-4 rounded-xl"
          />
        
          
        </div>
        <div className="flex flex-row space-x-10">
          <button
            className="rounded-full bg-blue-700 px-3 py-1"
            onClick={onResetPassword}
            disabled={disabled}
          >
            Reset Password
          </button>
        </div>

        <div className="flex flex-row space-x-10">
        {
            error
          }
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
