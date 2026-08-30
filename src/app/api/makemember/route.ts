import { DbConnection } from "@/lib/db/database";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/schema/user.schema";

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
        return NextResponse.json({message:"Unauthorized"},{status:401})
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
        return NextResponse.json({message:"Only workspace leaders can update members"},{status:403})
    }
    const update=await Member.updateOne({
        workspaceId:user.workspaceId,
        userId:userId,
        role:{$ne:"leader"}
    },{
        $set:{role:"member"}
        
    })
    if(!update.matchedCount){
        return NextResponse.json({message:"Cant find the user"},{status:403})
    }
    return NextResponse.json({message:"Role changed for user successfully"},{status:200})
}
