import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //Use nodemailer
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER!,
        pass: process.env.PASS!,
      },
    });

    const mailOptions={
        from:"JPS@gmail.com",
        to:email,
        subject:emailType==="VERIFY"?"Verify Your Mail":"Reset Your Password",
        html:`<p>Click <a href="${process.env.DOMAIN}/${emailType==="VERIFY"?"verifyemail":"resetpassword"}?token=${hashedToken}">Here</a> to ${emailType==="VERIFY"?"verify your mail":"Reset Your Password"}</p>`
    }

    const mailResponse=await transport.sendMail(mailOptions);
    return mailResponse


  } catch (err: any) {
    console.log("Error occurred in mailer Helper" + err.message);
  }
};
