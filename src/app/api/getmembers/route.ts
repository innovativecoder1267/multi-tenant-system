import { DbConnection } from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";
import { User } from "@/schema/user.schema";
import { Workspace } from "@/schema/workspace";

export async function GET(req:NextRequest) {
    await DbConnection();
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
    if(workspace.ownerId.toString()===String(token._id)){
        await User.findByIdAndUpdate(token._id,{workspaceId:workspace._id})
        await Member.findOneAndUpdate(
            {workspaceId:workspace._id,userId:token._id},
            {$set:{role:"leader"}},
            {upsert:true,new:true}
        )
    }
    const Find=await Member.find({workspaceId:workspace._id}).populate("userId","username email").lean()
    const currentMember=Find.find((member)=>member.userId?._id?.toString()===String(token._id))
    return NextResponse.json({members:Find,currentUserRole:currentMember?.role||"member"},{status:200})
}
