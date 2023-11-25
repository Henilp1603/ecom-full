import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";


const sendEmail=asyncHandler(async(data,req,res)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "henil1603@gmail.com",
          pass: "zgnh dngu hhov oufp",
        },
      });

    const info = await transporter.sendMail({
        from: "henil1603@gmail.com", // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.htm, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      
})

export default sendEmail

