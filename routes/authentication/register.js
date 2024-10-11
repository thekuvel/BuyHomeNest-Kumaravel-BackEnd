import express from "express";
import bcrypt from "bcrypt";
import {userModel} from "../../db/model.js"
import { mailOptions, transporter } from "./mailUtils.js";

const registerRouter = express.Router();

registerRouter.post("/",async (req,res)=>{
    let body = req.body;
    // console.log(body);

    //Checking if user already exist.
    let userObject = await userModel.findOne({userEmail : body.emailId})

    if(userObject){
        res.send({msg : "User already exist. Please login.", code: 0, email : userObject.emailId})
    }else{
      
        try {

            bcrypt.hash(body.password, 10, async function (err, hash) {
                if(err){
                    res.status(500).send({msg: "something went wrong", code : 0})
                }else{
                    //Creating New User
                    let user = await new userModel({
                        userName : body.userName,
                        userEmail : body.emailId,
                        userPassword : hash,
                        userType : body.userType || "",
                    })

                    await transporter.sendMail({
                        ...mailOptions,
                        to : body.emailId
                    });

                    await user.save(); //Saving the newly created user

                    res.send({msg : "User Createdd", code: 1}) 
                }
            });   
        
        } catch (error) {
            console.log(error);
            res.send({msg : "Error occured try again.", code: 0})
        }
        
    }
    
})

export default registerRouter