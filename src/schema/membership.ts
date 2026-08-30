import mongoose from "mongoose";

interface MembershipUser {
    workspaceId:mongoose.Types.ObjectId
    userId:mongoose.Types.ObjectId
    role:"leader"|"member"
}

const membershipschema=new mongoose.Schema<MembershipUser>({

    workspaceId:{
        type:mongoose.Types.ObjectId,
        ref:"Workspace",
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        enum:["leader","member"],
        default:"member",
        required:true
    }
})
export const Member=mongoose.models.Member || mongoose.model<MembershipUser>("Member",membershipschema)
