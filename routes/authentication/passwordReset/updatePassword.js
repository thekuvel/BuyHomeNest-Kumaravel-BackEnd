import express from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../../../db/model.js";
import bcrypt from "bcrypt";

let updatePasswordRouter = express.Router();

updatePasswordRouter.post("/", async (req,res) => {
    let body = req.body;
    try {
        let data = jwt.verify(body.token,process.env.JWT_Key)
        let userObj = await userModel.findOne({userEmail : data.email});
        
        if(userObj){

            bcrypt.hash(body.password, 10, async function(err, hash) {
                if(err){
                    res.send({msg : "Something went wrong", code : 0});
                }
                else{
                    await userModel.updateOne(
                        {userEmail : data.email},
                        {
                            $set : {userPassword : hash}
                        }
                    )
                    res.send({msg : "Password updated successfully.", code : 1});
                }
            });

            
        }else{
            res.send({msg : "Email not found.", code : 0});
        }

        
    } catch (error) {
        res.send({msg : "Link expired.", code : 0});
    }
    
})

export default updatePasswordRouter