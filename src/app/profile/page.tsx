"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Profile = () => {
  const Router=useRouter()
  const [data,setData]=useState("nothing")

  async function onLogout(){
    try{
      await axios.get("/api/users/logout")
      Router.push("/login")
      
    }
    catch(err:any){
      console.log("Error occcured while logging out"+err.message)
    }
  }

  useEffect(()=>{
    getUserDetails()
  },[])

  const getUserDetails=async()=>{
    try{
      const response =await axios.get('/api/users/me')
      console.log(response.data)
      setData(response.data.data._id)
      if(data !== "nothing")
      Router.push(`/profile/${data}`)
    }catch(err:any){
      console.log(err.message)
    }

  }


  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
      <div className="flex justify-center text-2xl font-bold">
        Profile Page
      </div>
      <div>
        {
      data==="nothing"?"":<button className="rounded-full bg-blue-700 px-3 py-1" onClick={getUserDetails} >
      Go to Profile

    </button>
      
      }
      </div>

      </div>
    </div>
  );
};

export default Profile;
