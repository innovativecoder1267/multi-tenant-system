import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string
        email?: string
        username?: string
        role?: string
        isVerified?: boolean
        workspaceId?: string
    }
    interface Session { 
        user:{
            _id?: string
            email?: string
            username?: string
            role?: string
            isVerified?: boolean
            workspaceId?: string
        }& DefaultSession["user"]
        }
     declare module 'next-auth/jwt'{
    interface JWT {
        _id?:string,
        id?:string,
        email?:string,
        role?:string,
        workspaceId?:string,
        isVerified?:boolean,
        IsAcceptingMessages?:boolean,
        username?:string
        isVerified?:boolean 
    }

     }
    }
