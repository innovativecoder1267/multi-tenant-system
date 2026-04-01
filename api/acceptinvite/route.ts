import { DbConnection } from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Invite } from "@/schema/inviteschema";
import { Member } from "@/schema/membership";
export async function POST(req:NextRequest){
    await DbConnection();   
    const tokens=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!tokens||!tokens._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const {token}=await req.json()
    if(!token)return
    const invite=await Invite.findOne({token:token})
    if(!invite){
        return new Response(JSON.stringify({message:"cant match the token"}),{status:401})
    }
    const Newmember=await Member.create({
        userId:tokens._id,
        workspaceId:invite.workspaceId,
        role:"member"
    })
    if(!Newmember){
        return NextResponse.json({message:"Cant create the new member"},{status:500})
    }
    return NextResponse.json({message:"User verified successfully"},{status:200})
}