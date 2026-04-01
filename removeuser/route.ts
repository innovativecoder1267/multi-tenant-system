import { DbConnection } from "@/lib/db/database";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
     if(!token||!token?._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const {userId}=await req.json()
    const Find = await Member.findOneAndDelete({
    workspaceId: token._id,
    userId: userId
})
    if(!Find){
        return new Response(JSON.stringify({message:"cant find the user"}),{status:403})
    }
    return NextResponse.json({message:"user removed successfully"},{status:200})
}