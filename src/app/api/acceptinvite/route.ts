import { DbConnection } from "@/lib/db/database"
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Invite } from "@/schema/inviteschema";
import { Member } from "@/schema/membership";
import { User } from "@/schema/user.schema";
import { Workspace } from "@/schema/workspace";

export async function GET(req:NextRequest){
    await DbConnection();
    const inviteToken=req.nextUrl.searchParams.get("token")
    if(!inviteToken){
        return NextResponse.json({message:"Invite token is required"},{status:400})
    }
    const invite=await Invite.findOne({token:inviteToken})
    if(!invite){
        return NextResponse.json({message:"Invite link is invalid"},{status:404})
    }
    if(invite.expiresAt<new Date()){
        return NextResponse.json({message:"Invite link has expired"},{status:410})
    }
    const workspace=await Workspace.findById(invite.workspaceId).select("name")
    return NextResponse.json({
        message:"Invite link is valid",
        workspaceName:workspace?.name||"this workspace"
    },{status:200})
}

export async function POST(req:NextRequest){
    await DbConnection();   
    const tokens=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!tokens||!tokens._id){
        return NextResponse.json({message:"Login required to accept invite",loginRequired:true},{status:401})
    }
    const {token}=await req.json()
    if(!token){
        return NextResponse.json({message:"Invite token is required"},{status:400})
    }
    const invite=await Invite.findOne({token:token})
    if(!invite){
        return NextResponse.json({message:"Invite link is invalid"},{status:404})
    }
    if(invite.expiresAt<new Date()){
        return NextResponse.json({message:"Invite link has expired"},{status:410})
    }
    const user=await User.findById(tokens._id)
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    const Newmember=await Member.findOneAndUpdate(
        {userId:tokens._id,workspaceId:invite.workspaceId},
        {$setOnInsert:{role:"member"}},
        {upsert:true,new:true}
    )
    if(!Newmember){
        return NextResponse.json({message:"Cant create the new member"},{status:500})
    }
    user.workspaceId=invite.workspaceId
    await user.save()
    return NextResponse.json({message:"Workspace joined successfully"},{status:200})
}
