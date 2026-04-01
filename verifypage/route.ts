import { User } from "@/schema/user.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {DbConnection} from "@/lib/db/database";
import { Workspace } from "@/schema/workspace";
export async function POST(req:Request){
    await DbConnection();
    const {otp,email}=await req.json();
    if(!otp||!email){
        return new Response("OTP is required", { status: 400 });
    }
    const user=await User.findOne({email:email})
    if(!user){
        return new Response("Invalid OTP", { status: 400 });
    }
    if(user.otpExpiry<Date.now()){
        return new Response("OTP has expired", { status: 400 });
    }
    const isMatch=await bcrypt.compare(otp,user.otp)
    if(!isMatch){
        return new Response("Invalid OTP", { status: 400 });
    }
    const workspace=await Workspace.create({
        ownerId:user._id,
        month:new Date().toLocaleString("default",{month:"long",year:"numeric"}),
        subscribedPlan:"Free"
    })
    if(!workspace){
        return new Response("Workspace creation failed", { status: 500 });
    }
    user.isVerified=true
    user.otp=undefined;
    user.otpExpiry=undefined;
    await user.save();
    return NextResponse.json({message:"Email verified successfully"}, { status: 200 });
}