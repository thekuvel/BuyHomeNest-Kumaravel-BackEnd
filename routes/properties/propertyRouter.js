import express from "express";
import {propertyModel} from "../../db/model.js"

const propertyRouter = express.Router();

propertyRouter.get("/", async (req,res) => {
    let body = req.body;

    let allProperties = await propertyModel.find({});

    res.send(allProperties);
});

propertyRouter.post("/getmydata", async (req,res) => {
    let body = req.body;

    let myProperties = await propertyModel.find({ownerEmail:body.userEmail});

    res.send(myProperties);
});


propertyRouter.post("/getSingleProperty", async (req,res) => {
    let body = req.body;

    let property = await propertyModel.findOne({_id:body.propertyId});

    res.send(property);
});

propertyRouter.post("/create", async (req,res) => {
    let body = req.body;
    try{
        let isSoldValue = "true"
        if(!body.isSold){
            isSoldValue = "false"    
        }
        let property = await new propertyModel({...body, isSold : isSoldValue});
        // console.log(property);
        await property.save();

        res.send({msg : "Property created successfully.", code : 1});

    }catch(err){
        res.send({msg : "Can't able to create property. All fields are mandatory. Try later.", code : 0})
    }
});

propertyRouter.post("/update", async (req,res) => {
    let body = req.body;
    console.log(body)
    try{
        let isSoldValue = "true"
        if(body.isSold == "false"){
            isSoldValue = "false"    
        }
        let property = await new propertyModel({...body, isSold : isSoldValue});
        console.log("Property",property);
        
        await propertyModel.updateOne(
            {_id : body._id},
            property
        )

        res.send({msg : "Property updated successfully.", code : 1});

    }catch(err){
        res.send({msg : "Cannot able to update property. Try later.", code : 0, error:err})
    }
});

propertyRouter.post("/delete", async (req,res) => {
    let body = req.body;
    console.log(body)
    try {
        await propertyModel.deleteOne({ _id: body.id });    
        res.send({msg : "Delete property successfully.", code : 1})       
    } catch (err) {
        res.send({msg : "Cannot delete property. Try later.", code : 0, error:err})   
    }
});

export default propertyRouter