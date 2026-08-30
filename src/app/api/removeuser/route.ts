import { DbConnection } from "@/lib/db/database";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schema/user.schema";

export async function POST(req:NextRequest) {
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
     if(!token||!token?._id){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const {userId}=await req.json()
    if(!userId){
        return NextResponse.json({message:"User id is required"},{status:400})
    }
    const user=await User.findById(token._id).select("workspaceId")
    if(!user?.workspaceId){
        return NextResponse.json({message:"Workspace not found"},{status:404})
    }
    const leader=await Member.findOne({
        workspaceId:user.workspaceId,
        userId:token._id,
        role:"leader"
    })
    if(!leader){
        return NextResponse.json({message:"Only workspace leaders can remove members"},{status:403})
    }
    const Find = await Member.findOneAndDelete({
    workspaceId: user.workspaceId,
    userId: userId,
    role:"member"
})
    if(!Find){
        return NextResponse.json({message:"Member not found or cannot remove leader"},{status:403})
    }
    return NextResponse.json({message:"user removed successfully"},{status:200})
}
