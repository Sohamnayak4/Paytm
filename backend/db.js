import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sohamnayak06:l4IXl8sck0FiZlBl@cluster0.dvuh9te.mongodb.net/paytm2")

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:15
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const bankSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    balance:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('User', userSchema)
const Bank = mongoose.model('Bank', bankSchema)

export { User, Bank }