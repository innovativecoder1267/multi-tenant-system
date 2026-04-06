import { User } from "@/schema/user.schema";
import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req:NextRequest){
    await DbConnection();
    const token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token||!token._id){
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const {newpass,confirmpass}=await req.json()
    if(!newpass||!confirmpass){
        return NextResponse.json({message:"Couldnt fetch the files "},{status:403})
    }
    if(newpass!=confirmpass){
        return NextResponse.json({message:"could find the user "},{status:403})
    }

    const userid=token._id
    const finduser=await User.findOne({_id:userid})
    if(!finduser){
        return NextResponse.json({message:"could find the user "},{status:403})
    }
    const hashedpass=await bcrypt.hash(newpass,10)
    console.log("hashedpas is",hashedpass);
    finduser.password=hashedpass
    await finduser.save();
    return NextResponse.json({message:"User password changed success"},{status:200})
}