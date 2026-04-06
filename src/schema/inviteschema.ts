import mongoose from "mongoose";

interface Invite {
    workspaceId: mongoose.Types.ObjectId
    token:string,
    expiresAt:Date
}

const inviteschema=new mongoose.Schema<Invite>({
    workspaceId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Workspace"
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})
export const Invite=mongoose.models.Invite||mongoose.model("Invite",inviteschema)
