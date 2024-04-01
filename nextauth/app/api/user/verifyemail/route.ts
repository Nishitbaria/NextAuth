
import User from "@/databases/user.model";
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
        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }


}