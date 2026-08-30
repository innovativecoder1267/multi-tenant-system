import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    return NextResponse.json({message:"Invited users stay as members and cannot be promoted"},{status:403})

}
