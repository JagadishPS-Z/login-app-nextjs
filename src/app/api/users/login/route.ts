/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDB from "@/helper/dbconnect"
import User from "@/models/userModel"
import {NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        //Check if User exists
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        //check password
        const validPassword=bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"Password is wrong"},{status:400})
        }


        //create Token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create token

        const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response= NextResponse.json({message:"User logged in Successfully",success:true,token:token})
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    }
    catch(err:any){
        console.log(err.message)
        return NextResponse.json({error:err.message},{status:500})
    }
}