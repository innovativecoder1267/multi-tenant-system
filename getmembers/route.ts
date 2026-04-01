import { DbConnection } from "@/lib/db/database";
import { NextRequest, NextResponse } from "next/server";
import { Member } from "@/schema/membership";
import { getToken } from "next-auth/jwt";

export async function GET(req:NextRequest) {
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
      if(!token||!token?._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const Find=await Member.find({workspaceId:token._id}).populate("userId")
    console.log("Member data is",Find);
    if(!Find){
       return new Response(JSON.stringify({message:"Not found the user obj"}),{status:403})
    }
    return NextResponse.json([Find],{status:200})

}