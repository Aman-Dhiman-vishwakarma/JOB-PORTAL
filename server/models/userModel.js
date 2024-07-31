import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        reqired:true,
    },
    email:{
        type:String,
        reqired:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        reqired:true,
        unique:true
    },
    password:{
        type:String,
        reqired:true
    },
    role:{
        type:String,
        enum:["student", "recruiter"],
        reqired:true
    },
    profile:{
        bio:{ type:String},
        skills:[{ type:String}],
        resume:{ type:String},
        resumeorignalname:{ type:String},
        company:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilephoto:{type:String, default:""}
    }
}, {timestamps:true})

export const User = mongoose.model("User", userSchema)