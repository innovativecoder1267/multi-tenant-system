import mongoose, {Schema,Document} from "mongoose"
import {z} from "zod"
export interface UserDocument extends Document{
    email:string,
    username:string,
    password:string,
    isVerified:boolean,
    otp?:string,
    otpExpiry?:Date,
    subscribedPlan:string,
    workspaceId:mongoose.Types.ObjectId
}


const UserSchema=new Schema<UserDocument>({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    subscribedPlan:{
        type:String,
        enum:["Free","Pro","Enterprise"],
        default:"Free"
    },
    workspaceId:{
        type:Schema.Types.ObjectId,
        ref:"Workspace",       
    },
    otp:{
        type:String,
     },
    otpExpiry:{
        type:Date,
     }
})
export const User=mongoose.models.User || mongoose.model<UserDocument>("User",UserSchema)