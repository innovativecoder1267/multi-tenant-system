import { User } from "@/schema/user.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {DbConnection} from "@/lib/db/database";
export async function POST(req:Request) {
    await DbConnection();
    console.log("req received")
    const {email,username,password,confirmpassword}=await req.json();
    if(!email||!username||!password||!confirmpassword){
        return new Response("Missing required fields", { status: 400 });
    }
    const otp=Math.floor(100000+Math.random()*900000).toString();

    console.log(email,username,password,confirmpassword);
    if(confirmpassword!==password){
        return new Response("Passwords do not match", { status: 400 });
    }
    const existinguser =await User.findOne({$or:[{email:email},{username:username}]})
    if(existinguser){
        if(existinguser.isVerified){
            return new Response("User with this email or username already exists", { status: 400 });
        }
        else{
            existinguser.email=email;

            existinguser.username=username;
            const hashedpassword=await bcrypt.hash(password,10);
            existinguser.password=hashedpassword;
            const hashedotp=await bcrypt.hash(otp,10)
            existinguser.otp=hashedotp;
            existinguser.otpExpiry=Date.now()+10*60*1000;
            await existinguser.save();
            return NextResponse.json({otp}, { status: 200 });
        }
    }
    const hashedotp=await bcrypt.hash(otp,10)
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser=await User.create({
        email:email,
        username:username,
        password:hashedpassword,
        isVerified:false,
        otp:hashedotp,
        otpExpiry:Date.now()+10*60*1000
    })
    if(!newuser){
        return new Response("Failed to create user", { status: 500 });
    }
    console.log("Response created");
    return NextResponse.json({otp},{status:201})
}