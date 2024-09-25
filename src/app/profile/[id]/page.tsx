"use client"
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserProfile = ({params}:any) => {
  const Router=useRouter()
  
  async function onLogout(){
    try{
      await axios.get("/api/users/logout")
      Router.push("/login")
      
    }
    catch(err:any){
      console.log("Error occcured while logging out"+err.message)
    }
  }

  return (
    <div>
    <Navbar/> 
    <div className="flex justify-center items-center w-1/2 m-auto flex-col space-y-5 border-2 p-5">
    <div className="flex justify-center text-2xl font-bold">
      My Profile
    </div>
    <div>
      userId : {params.id}
    </div>
    <div>
    <button className="rounded-full bg-blue-700 px-3 py-1" onClick={onLogout}>
          Logout
        </button>
    </div>
    
    </div>
  </div>
  )
}

export default UserProfile