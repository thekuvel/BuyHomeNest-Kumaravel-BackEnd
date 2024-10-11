import express from "express";
import { contactAgentModel, propertyModel, userModel } from "../../db/model.js";


let userRouter = express.Router();

userRouter.get("/allagents", async (req,res) => {
    
    let allAgents = await userModel.find({userType : "agent"})
    res.send(allAgents)
    
})

userRouter.post("/updateagent", async (req,res) => {
    
    let body = req.body

    try {

        await userModel.updateOne({userEmail : body.email},
            body
        )

        res.send({msg:"Agent updated successfully", code : 1})
    } catch (error) {
        res.send({msg:"Cannot update agent. Try later.", code : 0})   
    } 
})

userRouter.post("/deleteagent", async (req,res) => {
    
    let body = req.body

    try {

        await userModel.deleteOne({userEmail : body.email})

        res.send({msg:"Agent deleted successfully", code : 1})
    } catch (error) {
        res.send({msg:"Cannot delete agent. Try later.", code : 0})   
    } 
})

// userRouter.post("/deleteagent", async (req,res) => {
    
//     let body = req.body

//     try {

//         await userModel.deleteOne({userEmail : body.email})

//         res.send({msg:"Agent deleted successfully", code : 1})
//     } catch (error) {
//         res.send({msg:"Cannot delete agent. Try later.", code : 0})   
//     } 
// })

userRouter.post("/addtowishlist", async (req,res) => {
    
    let body = req.body

    try {

        let userObject = await userModel.findOne({userEmail : body.email});
        // console.log(userObject);
        
        let wishlistArray = userObject.myWishlist;
        let alreadyAdded = wishlistArray.filter((id) => id == body.propertyId)
        if(alreadyAdded[0]){
            console.log("already added", alreadyAdded);
            res.send({msg:"Already wishlisted.", code : 0})
        }else{
            
            //Adding property to User Collection
            wishlistArray.push(body.propertyId);
            await userModel.updateOne(
                {userEmail : body.email},
                {$set:{myWishlist : wishlistArray}}
            )
            
            //Increasing count in property Collection
            let propertyObject = await propertyModel.findOne({_id:body.propertyId})
            let count = propertyObject.wishlistCount + 1;
            await propertyModel.updateOne(
                {_id:body.propertyId},
                {$set:{wishlistCount : count}}
            )

            res.send({msg:"Property added to wishlisted", code : 1})
        }
    } catch (error) {
        res.send({msg:"Can't able to wishlist.", code : 0})   
    } 
})

userRouter.post("/getMyWishlist", async (req,res) => {
    
    let body = req.body

    try {

        let userObject = await userModel.findOne({userEmail : body.email})
        let wishlistArray = userObject.myWishlist

        // console.log(userObject,wishlistArray);
        
        
        let properties = await propertyModel.find({
            _id : { $in : wishlistArray}
        })

        // console.log(properties);
        res.send({msg:"Success", code:1, properties});

    } catch (error) {
        res.send({msg:"Cannot get Wishlist. Try later.", code : 0})   
    } 
})


userRouter.post("/contactAgent", async (req,res) => {
    
    let body = req.body

    try {
        // console.log(body);

        let contactObject = await contactAgentModel.findOne({...body})

        if(contactObject){
            res.send({msg:"Request already created.", code : 0})
        }else{
            let contact = await new contactAgentModel({...body})
            await contact.save();
            res.send({msg:"Request Create. Agent will get in touch soon.", code:1, body});
        }

    } catch (error) {
        res.send({msg:"Cannot create contact request. Try later.", code : 0})   
    } 
})

userRouter.get("/getAllContact", async (req,res) => {

    try {
        let contacts = await contactAgentModel.find({})
        res.send({msg:"", code : 1, contacts})        
    } catch (error) {
        res.send({msg:"Cannot get all contacts. Try later.", code : 0})   
    } 
})

export default userRouter
