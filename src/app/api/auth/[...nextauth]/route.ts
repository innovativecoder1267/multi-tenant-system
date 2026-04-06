import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/schema/user.schema"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth";
import { DbConnection } from "@/lib/db/database";
import { NextAuthOptions } from "next-auth";
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
    return {
        _id:Finduser._id,
        email:Finduser.email,
        username:Finduser.username,
        role:Finduser.role,
        isVerified:Finduser.isVerified
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
            token._id=user._id
            token.email=user.email
            token.username=user.username
            token.role=user.role
            token.isVerified=user.isVerified
        }
      return token
    },
    async session({ session, token,user }) {
       if(token){
        session.user._id=user._id
        session.user.email=user.email
        session.user.username=user.username
        session.user.role=user.role
        session.user.isVerified=user.isVerified
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