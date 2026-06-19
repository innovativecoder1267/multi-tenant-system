import {
  EC2Client,
  DescribeInstancesCommand,
} from "@aws-sdk/client-ec2";
import {DbConnection} from "@/lib/db/database";
import {Awscollection} from "../../../schema/awscollection.schema"
import { NextResponse } from "next/server";
import { Workspace } from "../../../schema/workspace";
import {getToken} from "next-auth/jwt"
import { NextRequest } from "next/server";
import {encrypt} from "@/lib/security/encryption"
export async function POST(req: NextRequest) {
    await DbConnection();
    console.log("Received request to connect AWS");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
     if(!token||!token._id){
        return new Response("Unauthorized", { status: 401 });
    }
    const userid=token._id;
    console.log("User ID:", userid);
    const { accessKey, secretKey, region } = await req.json();
    if (!accessKey || !secretKey || !region) {
      return new Response("Missing  fields", { status: 400 });
    }
    const encryptedSecretKey = encrypt(secretKey);
     const client = new EC2Client({
    region,
    credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    
  },
});

    const command = new DescribeInstancesCommand({});
    const response = await client.send(command);
    console.log("Response is ",response)
    if(!response||!response.Reservations||!response.$metadata||response.$metadata.httpStatusCode!==200){
        return new Response("Invalid AWS credentials or region", { status: 400 });
    }
    const instanceid=response.Reservations?.[0]?.Instances?.[0]?.InstanceId;;
  if (!instanceid) {
  return new Response("No EC2 instance found", {
    status: 404,
  });
}
    const workspace=await Workspace.findOne({ownerId:userid})
    if(!workspace){
        return new Response("Workspace not found", { status: 404 });
    }
    const collection= await Awscollection.create({
        userId:userid,
        workspaceId:workspace._id,
        access_key:accessKey,
        secret_key:encryptedSecretKey,
        region:region,
        instanceid:instanceid
    })
    if(!collection){
        return new Response("Failed to save AWS credentials", { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "AWS connected successfully",
      response
    });

  }
