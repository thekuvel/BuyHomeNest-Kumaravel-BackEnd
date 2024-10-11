import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { text } from "express";

dotenv.config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : "evvi.mail.contact@gmail.com",
        pass : process.env.Mail_Pass || ""
    }
});

const mailOptions = {
    from : "evvi.mail.contact@gmail.com",
    to : "thekuvel@gmail.com",
    subject : "BuyHomeNest Email Verification",
    text : "Account created successfully."
}

export {
    transporter,
    mailOptions
}