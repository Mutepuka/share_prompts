import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

{/**create a handler for the authentication */}
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRETE
        })
    ],
    async session({session}){
        //get the data of the user once the sign IN
        const userSession = await user.findOne({
            email: session.user.email,
        });

        //update the users id
        session.user.id = userSession._id.toString();
        return session;
    },
    async signIn({profile}){
        try {

            //call the connectToDB function
            await connectToDB();

            //check if user exists
            const userExits = await User.findOne({
                email: profile.email
            });

            //if not in database create new user
            if(!userExits){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "")
                    .toLowerCase(),
                    image: profile.picture
                })
            }

            return true;
            
        } catch (error) {
            console.log(error);
            return false;
            
        }

    }
    
})

export {handler as GET, handler as POST}