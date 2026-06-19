import {Awscollection} from "@/schema/awscollection.schema";
import { NextRequest, NextResponse } from "next/server";
import { DbConnection } from "@/lib/db/database";
import { getToken } from "next-auth/jwt";
 
export async function GET(req: NextRequest) {
    await DbConnection();
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || !token._id) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }
    const userId = token._id;
    console.log("REQUEST RECEIVED IN CHECK AWS")
    const Findawscollection = await Awscollection.findOne({ userId: userId });
    if (!Findawscollection) {
        return NextResponse.json({ totalRequests: 0 });
    }
    return NextResponse.json({ success:true });
}