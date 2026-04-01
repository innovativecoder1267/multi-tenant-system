import { DbConnection } from "@/lib/db/database";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await DbConnection();
    const {userId}=await req.json();
    if(!userId){
        return NextResponse.json({message:"User id not found"},{status:401})
    }
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const update=await Member.updateOne({
        workspaceId:token._id,
        userId:userId
    },{
        $set:{role:"member"}
    })
    if(!update){
        return new Response(JSON.stringify({message:"Cant find the user"}),{status:403})
    }
    return NextResponse.json({message:"Role changed for user successfully"},{status:200})
}