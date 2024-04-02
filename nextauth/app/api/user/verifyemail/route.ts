
import User from "@/databases/user.model";
import console from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const reqBody = await req.json();

        const { token } = reqBody

        console.log(reqBody);


        const user = await User.findOne({
            verifytoken: token,
            verifytokenExpire: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }
        console.log(user);
        console.log(user.isVerifed);
        user.isVerifed = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        const response = NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

        console.log(response);

        return response;

    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
}