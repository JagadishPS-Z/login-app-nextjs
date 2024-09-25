import connectDB from "@/helper/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      NextResponse.json({ error: "user not Found" }, { status: 400 });
    }

    user.isverified=true
    user.verifyToken=undefined
    user.verifyTokenExpiry=undefined
    await user.save()

    return NextResponse.json({message:"Email verified",success:true},{status:200})

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
