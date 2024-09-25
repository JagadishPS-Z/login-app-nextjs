"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const router=useRouter()
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable,setButtonDisable]=useState(false)
  const [loading,setloading]=useState(false)
  useEffect(()=>{
    if(user.email.length>0 &&user.password.length>0 && user.username.length>0){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true)
    }
  },[user])
  async function onSignup(){
    try{
      setloading(true)
      const response=await axios.post("/api/users/signup",user)
      console.log("Signup in success",response.data)
      router.push("/login")

    }
    catch(err:any){
      console.log("Error occurred during Sign up"+err.message)
    }
  }
  return (
    <div>
      <Navbar/>
    <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
    <div className="flex justify-center text-2xl font-bold">
        Signup Page
      </div>
      <div className="flex flex-row space-x-10">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={user.username}
          onChange={(e) => {
            setuser({ ...user, username: e.target.value });
          }}
          className=" text-black px-4 rounded-xl"
        />
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
          className=" text-black px-4 rounded-xl"
          
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
      <div>
        <button className="rounded-full bg-blue-700 px-3 py-1" onClick={onSignup} disabled={buttonDisable}>
          {loading?"Signing In":"Sign in"}

        </button>
    </div>
    </div></div>
  );
};

export default Signup;
