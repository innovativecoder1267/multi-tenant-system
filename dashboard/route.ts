import { User } from "@/schema/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req:NextRequest){
    const token=await getToken({req,secret:process.env.NEXTAUTH_SECRET})
    console.log(token?._id);
    if(!token||!token?.email){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const userid=token._id
    const finduser=await User.findById(userid).select("subscribedPlan")
    console.log(finduser);
    if(!finduser){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    return NextResponse.json({currentPlan:finduser},{status:200})
}