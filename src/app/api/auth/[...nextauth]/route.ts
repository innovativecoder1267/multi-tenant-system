import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/schema/user.schema"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth";
import { DbConnection } from "@/lib/db/database";
import { NextAuthOptions } from "next-auth";
import { Workspace } from "@/schema/workspace";
 export const authOptions:NextAuthOptions = {
    providers: [
  CredentialsProvider({
     name: 'Credentials',
     credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
    await DbConnection();
    console.log("Credentials are",credentials)
    
    const Finduser=await User.findOne({$or:[{email:credentials?.email}]})     
    if(!Finduser){
      throw new Error("User not found")
    }     
    if(!Finduser.isVerified){
      throw new Error("Please verify your email before logging in.")    
    }
    const isPasswordvalid=await bcrypt.compare(
      credentials?.password as string,
      Finduser.password
    );
    if(!isPasswordvalid){
      throw new Error("Password is incorrect")
    }
    const workspace=Finduser.workspaceId
      ? Finduser.workspaceId
      : (await Workspace.findOne({ownerId:Finduser._id}).select("_id"))?._id
    return {
        id:Finduser._id,
        email:Finduser.email,
        username:Finduser.username,
        role:Finduser.role,
        isVerified:Finduser.isVerified,
        workspaceId:workspace?.toString()
    }
    }
  })
],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token,user}) {
        if(user){
            token._id=user.id
            token.email=user.email
            token.username=user.username
            token.role=user.role
            token.isVerified=user.isVerified
            token.workspaceId=user.workspaceId
        }
      return token
    },
    async session({ session, token }) {
       if(token){
        session.user._id=token._id as string
        session.user.email=token.email as string
        session.user.username=token.username as string
        session.user.role=token.role as string
        session.user.isVerified=token.isVerified as boolean
        session.user.workspaceId=token.workspaceId as string
       }
      return session
    }
},
pages:{
    signIn:"/login",
    signOut:"sign-out"
},
secret:process.env.NEXTAUTH_SECRET,
}
const handler=NextAuth(authOptions)
export {handler as GET,handler as POST}
