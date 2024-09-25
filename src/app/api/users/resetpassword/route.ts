import connectDB from "@/helper/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token,password} = reqBody;

    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      NextResponse.json({ error: "user not Found" }, { status: 400 });
    }

    const salt=await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

    user.password=hashedPassword
    user.forgotPasswordToken=undefined
    user.forgotPasswordTokenExpiry=undefined

    await user.save()

    return NextResponse.json({message:"Password reset successfull on DB",success:true},{status:200})

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
