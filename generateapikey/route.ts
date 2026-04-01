import { ApiKey } from "@/schema/api-key";
import { DbConnection } from "@/lib/db/database";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import crypto from "crypto";
export async function POST(req:NextRequest){
    await DbConnection();
    const {name}=await req.json();
    if(!name){
        return new Response(JSON.stringify({message:"Key name is required"}),{status:400})
    }
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const apikey=crypto.randomBytes(32).toString("hex")
    const newApikey=await ApiKey.create({
        workspaceId:token._id,
        key:apikey,
        name:name
    })
    if(!newApikey){     
        return new Response(JSON.stringify({message:"API key generation failed"}),{status:500})
    }
    return new Response(JSON.stringify({message:"API key generated successfully"}),{status:200})
}