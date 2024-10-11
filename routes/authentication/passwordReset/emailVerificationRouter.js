import express from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../../../db/model.js";
import { mailOptions, transporter } from "../mailUtils.js";
import dotenv from "dotenv";

dotenv.config();

const emailVerificationRouter = express.Router();

emailVerificationRouter.post("/", async (req,res) => {
    
    let body = req.body
    
    try {
        let userObj = await userModel.findOne({userEmail : body.emailId});
        // console.log(data)
        let data = {
            email : userObj.userEmail
        }
        let token = jwt.sign({ ...data }, process.env.JWT_Key, { expiresIn: '15m' });
        await transporter.sendMail({
            ...mailOptions,
            to : userObj.userEmail,
            subject : "BuyHomeNestDB password rest link",
            text : `${process.env.URL_Front_End}/setpassword?token=${token}`
        })

        res.send({msg : "Email verified successfully, password reset mail sent.", code : 1});
    } catch (error) {
        res.send({msg : "Mail not found in database.", code : 0})
    }
    
})

export default emailVerificationRouter