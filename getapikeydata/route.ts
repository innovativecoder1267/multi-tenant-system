import { ApiKey } from "@/schema/api-key";
import { DbConnection } from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req:NextRequest){
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })  
    if(!token||!token._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const apiKeys=await ApiKey.find({workspaceId:token._id}).select("name createdAt isActive key").lean();
    if(!apiKeys){
        return new Response(JSON.stringify({message:"Failed to fetch API keys"}),{status:500})
    }
    return NextResponse.json({apiKeys},{status:200})
}