import { DbConnection } from "@/lib/db/database";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { Workspace } from "@/schema/workspace";
 
export async function POST(req:NextRequest){
    await DbConnection();

    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const {name}=await req.json();
     if(!name){
        return NextResponse.json({message:"name not found"},{status:401})
    }
    const Find=await Workspace.findOne({ownerId:token._id})
    if(!Find){
        return NextResponse.json({message:"Cant find the user"},{status:403})
    }
    if(name==="pro"){
        Find.subscribedPlan="pro"
    }
    else{
        Find.subcribedplan="Business"
    }
        return NextResponse.json({message:"User role changed successfully"},{status:200})
}