import connectDB from "@/helper/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer"


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({email:email});

    if (!user) {
      NextResponse.json({ error: "User not Found" }, { status: 400 });
    }

    await sendEmail({email,emailType:"RESET",userId:user._id})

    return NextResponse.json({message:"Email successfully sent",success:true},{status:200})

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
