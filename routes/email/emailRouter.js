import express from "express"
import { mailOptions, transporter } from "../authentication/mailUtils.js";

let emailRouter = express.Router();

emailRouter.post("/send", async(req,res)=>{
    let body = req.body
    console.log(body);

    try{
        await transporter.sendMail({
            ...mailOptions,
            to : body.toEmail,
            subject : body.subject,
            text : ` Meeting Scheduled on ${body.date} ${body.time} \n ${body.message}`
        })

        res.send({msg: "Mail sent successfully.", code:1})
    }catch(error){
        res.send({msg: "Mail Failed. Try later.", code:0})
    }
    
    
})

export default emailRouter