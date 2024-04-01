import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import Email from 'next-auth/providers/email';
import bcryptjs from "bcryptjs";
connectToDatabase();
export const NEXT_AUTH_CONFIG = {
    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                Email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {

                const reqBody = credentials;

                const { Email, password } = reqBody

                console.log(reqBody);

                const user = await User.findOne({
                    email: Email
                })

                if (!user) {
                    throw new Error('No user found')
                }

                const isValidPassword = await bcryptjs.compare(password, user.password)

                if (!isValidPassword) {
                    throw new Error('Invalid Password')
                }

                return {
                    id: user.id,
                    name: user.name,
                    userId: user.userId,
                    email: user.email,
                    message: "User Logged in Successfully",
                };
            },
        }),
    ],
    secret: "secret",
}