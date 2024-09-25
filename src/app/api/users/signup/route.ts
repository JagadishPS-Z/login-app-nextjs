/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDB from "@/helper/dbconnect"
import User from "@/models/userModel"
import {NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helper/mailer"


connectDB()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log(reqBody);

        //Check if User exists
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"},{status:400})
        }

        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        //create new user and save to DB
        const newuser=new User({
            username,email,password:hashedPassword
        })

        const savedUser=await newuser.save()


        //Send verification Email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({message:"User saved Successfully",success:true,savedUser})



    }
    catch(err:any){
        console.log(err.message)
        return NextResponse.json({error:err.message},{status:500})
    }
}