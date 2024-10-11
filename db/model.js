import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type: "string",
        required : true
    },
    userEmail :{
        type: "string",
        required : true
    },
    userPassword : {
        type: "string",
        required : true
    },
    userType :{
        type : "string",
        required : false,
        default : "user"
    },
    myProperties :{
        type : [{}],
        required : false,
    },
    myCustomers :{
        type : [{}],
        required : false,
    },
    myWishlist :{
        type : [{}],
        required : false,
    },

});

const propertySchema = new mongoose.Schema({
    area: {
        type: "string",
        required: true
    },
    city: {
        type: "string",
        required: true
    },
    state: {
        type: "string",
        required: true
    },
    noOfRoom: {
        type: "number",
        required: true
    },
    noOfBath: {
        type: "number",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    size: {
        type: "number",
        required: true
    },
    price: {
        type: "number",
        required: true
    },
    minPrice: {
        type: "number",
        required: false
    },
    isSold: {
        type: "boolean",
        required: true
    },
    wishlistCount: {
        type: "number",
        required: false,
        default : 0
    },
    ownerEmail : {
        type: "string",
        required: true
    },
});

const contactAgentSchema = new mongoose.Schema({
    userEmail :{
        type: "string",
        required : true
    },
    propertyId : {
        type: "string",
        required: true
    },
    ownerEmail : {
        type: "string",
        required: true
    },
})

const userModel = new mongoose.model("user", userSchema, "users");
const propertyModel = new mongoose.model("property", propertySchema, "properties");
const contactAgentModel = new mongoose.model("contact", contactAgentSchema, "contacts");

export {userModel,propertyModel,contactAgentModel};
