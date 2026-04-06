import { DbConnection } from "@/lib/db/database";
import { Workspace } from "@/schema/workspace";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    await DbConnection();

    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return NextResponse.json({message:"unauthorized"},{status:401})
    }
    const {workspacename}=await req.json()
    const userid=token._id
    const Find=await Workspace.findOne({ownerId:userid})
    if(!Find){
        return NextResponse.json({message:"Cant find the user"},{status:403})
    }
    Find.name=workspacename
    await Find.save();

    return NextResponse.json({message:"Workspace changed"},{status:200})
}