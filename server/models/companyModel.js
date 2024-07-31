import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true,
        unique:true
      },
      description: {
        type: String,
      },
      website: {
        type: String,
      },
      location: {
        type: String,
      },
      logo:{
        type:String
      },
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        reqired: true,
      },
}, {timestamps:true})

export const Company = mongoose.model("Company", companySchema)