import mongoose from "mongoose";

interface WorkspaceDocument extends mongoose.Document{
    ownerId:mongoose.Types.ObjectId
    month:string
    requestCount?:number
    storageUsed?:number,
    subscribedPlan:"Free"|"Pro"|"Enterprise",
    members:string
    name:string
}

const workspaceSchema=new mongoose.Schema<WorkspaceDocument>({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
    type:String,
    required:true
    },
    month:{
        type:String,
        required:true
    },
    requestCount:{
        type:Number,
        default:0
    },
    storageUsed:{
        type:Number,
        default:0
    },
    subscribedPlan:{
        type:String,
        enum:["Free","Pro","Enterprise"],
        required:true
    },
    members:{
        type:String,
    }
})
export const Workspace=mongoose.models.Workspace || mongoose.model<WorkspaceDocument>("Workspace",workspaceSchema)