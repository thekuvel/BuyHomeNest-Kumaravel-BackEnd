import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../db/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loginRouter = express.Router();

loginRouter.post("/", async (req,res)=>{

    let body=req.body;

    try{
        let userObject = await userModel.findOne({userEmail : body.emailId});

        if(userObject){
            
            bcrypt.compare(body.password, userObject.userPassword, async (err,result)=>{
                if(err){
                    res.status(500).send({msg:"Something went wrong", code : 0});
                }else{
                    if(result){
                        // console.log(userObject);
                        let data = {
                            userEmail : userObject.userEmail,
                            userType : userObject.userType,
                            isSignedIn : true
                        }
                        
                        let token = jwt.sign({ ...data }, process.env.JWT_Key, { expiresIn: '1d' });
                        res.send({msg : "User found.", code : 1, token})
                    }else{
                        res.send({msg : "Password wrong.", code : 0})
                    }
                }
                
            })
        }else{
            res.send({msg : "EmailId not found. Please check or register new account.", code : 0});
        }
    }catch(err){
        console.log(err);
        res.send({msg : "Something went wrong. Try later", code : 0});
    }
    


})

export default loginRouter