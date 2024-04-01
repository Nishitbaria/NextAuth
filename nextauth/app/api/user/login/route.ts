import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/databases/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import console from "console";


export async function POST(req: NextRequest) {
    connectToDatabase();

    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody

        console.log(reqBody);
        const user = await User.findOne({
            email
        })

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 })
        }

        const isValidPassword = await bcryptjs.compare(password, user.password)

        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }


        const Secerttoken = process.env.NEXTAUTH_SECRET;
        console.log(Secerttoken)

        const token = await jwt.sign(tokenData, Secerttoken!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Loqged in successfully",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}