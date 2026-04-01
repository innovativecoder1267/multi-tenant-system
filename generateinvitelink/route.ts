import { Invite } from "@/schema/inviteschema";
import { NextRequest, NextResponse } from "next/server";
import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
import crypto from "crypto";
export async function POST(req:NextRequest) {
    await DbConnection()
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token?._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const id=token._id
    const Newtoken=crypto.randomBytes(32).toString("hex")
    const expiresAt=new Date(Date.now()+7*24*60*60*1000)
    const newinvite=await Invite.create({
        workspaceId:id,
        token:Newtoken,
        expiresAt
    })
    if(!newinvite){
        return new Response(JSON.stringify({message:"Failed to generate invite link"}),{status:500})
    }
    const invitelink =`${process.env.NEXTAUTH_URL}/invite?token=${Newtoken}`   
 return new Response(JSON.stringify({message:"Invite link generated successfully", invitelink}),{status:200})
}
