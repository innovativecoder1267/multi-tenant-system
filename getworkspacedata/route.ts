import { User } from "@/schema/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DbConnection } from "@/lib/db/database";
import { Workspace } from "@/schema/workspace";
export async function GET(req:NextRequest) {
    await DbConnection()
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token?._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const Userid=token._id
    const workspaceData=await Workspace.findOne({ownerId:Userid}).select("requestCount storageUsed")
    if(!workspaceData){
        return new Response(JSON.stringify({message:"Workspace data not found"}),{status:404})
    }
    return  NextResponse.json({workspaceData},{status:200})
}