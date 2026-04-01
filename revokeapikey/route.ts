import { ApiKey } from "@/schema/api-key";
import { NextRequest } from "next/server";
import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
export async function POST(req:NextRequest) {
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return new Response(JSON.stringify({message:"Unauthorized"}),{status:401})
    }
    const {itemid}=await req.json();
    if(!itemid){
        return new Response(JSON.stringify({message:"API key ID is required"}),{status:400})
    }
    const Revoke=await ApiKey.findOneAndDelete({workspaceId:token._id,_id:itemid})
    if(!Revoke){
        return new Response(JSON.stringify({message:"Failed to revoke API key"}),{status:500})
    }
    return new Response(JSON.stringify({message:"API key revoked successfully"}),{status:200})
}