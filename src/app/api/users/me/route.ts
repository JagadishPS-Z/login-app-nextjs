import connectDB from "@/helper/dbconnect"
import getDataFromToken from "@/helper/getDataFromToken"
import User from "@/models/userModel"
import {NextRequest, NextResponse } from "next/server"

connectDB()

export async function GET(request:NextRequest){
    try{
        const userId=await getDataFromToken(request)
        const user=await User.findById(userId).select("-password")
        return NextResponse.json({message:"User found",data:user})
    }
    catch(err:any){
        console.log("Error while fetching the user Profile of current user"+err.message)
    }
}
