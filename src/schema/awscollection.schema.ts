import mongoose from "mongoose"

const awscollectionschema = new mongoose.Schema({
  workspaceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  access_key:{
    type:String,
    required:true
  },
  secret_key:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  region:{
    type:String,
    required:true
  },
    instanceid:{
    type:String,
    required:true
  },
  lastUsed:{
    type:Date
  },
  isActive:{
    type:Boolean,
    default:true
  },
  expiredate:{
    type:Date,
  }
})

export const Awscollection =
mongoose.models.AwsCollection ||
mongoose.model("AwsCollection", awscollectionschema)