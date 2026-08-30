import { Invite } from "@/schema/inviteschema";
import { NextRequest, NextResponse } from "next/server";
import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
import crypto from "crypto";
import { Workspace } from "@/schema/workspace";
import { Member } from "@/schema/membership";
import { User } from "@/schema/user.schema";
export async function POST(req:NextRequest) {
    await DbConnection()
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token?._id){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const user=await User.findById(token._id).select("workspaceId")
    const workspace=await Workspace.findOne({
        $or:[
            {_id:user?.workspaceId},
            {ownerId:token._id}
        ]
    }).select("_id ownerId")
    if(!workspace){
        return NextResponse.json({message:"Workspace not found"},{status:404})
    }
    const leader=await Member.findOne({
        workspaceId:workspace._id,
        userId:token._id,
        role:"leader"
    })
    if(!leader&&workspace.ownerId.toString()!==String(token._id)){
        return NextResponse.json({message:"Only workspace leaders can invite members"},{status:403})
    }
    await User.findByIdAndUpdate(token._id,{workspaceId:workspace._id})
    await Member.findOneAndUpdate(
        {workspaceId:workspace._id,userId:token._id},
        {$set:{role:"leader"}},
        {upsert:true,new:true}
    )
    const Newtoken=crypto.randomBytes(32).toString("hex")
    const expiresAt=new Date(Date.now()+7*24*60*60*1000)
    const newinvite=await Invite.create({
        workspaceId:workspace._id,
        token:Newtoken,
        expiresAt
    })
    if(!newinvite){
        return NextResponse.json({message:"Failed to generate invite link"},{status:500})
    }
    const baseUrl=process.env.NEXTAUTH_URL||req.nextUrl.origin
    const invitelink =`${baseUrl}/invite?token=${Newtoken}`   
 return NextResponse.json({message:"Invite link generated successfully", invitelink},{status:200})
}
