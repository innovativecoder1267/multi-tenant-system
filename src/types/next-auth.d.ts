import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string
        email?: string
        username?: string
        role?: string
        isVerified?: boolean
    }
    interface Session { 
        user:{
            _id?: string
            email?: string
            username?: string
            role?: string
            isVerified?: boolean
        }& DefaultSession["user"]
        }
     declare module 'next-auth/jwt'{
    interface JWT {
        id?:string,
        isVerified?:boolean,
        IsAcceptingMessages?:boolean,
        username?:string
        isVerified?:boolean 
    }

     }
    }