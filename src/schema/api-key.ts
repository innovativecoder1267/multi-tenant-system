import mongoose from "mongoose"

const apiKeySchema = new mongoose.Schema({
  workspaceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },
  key:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
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

export const ApiKey =
mongoose.models.ApiKey ||
mongoose.model("ApiKey", apiKeySchema)