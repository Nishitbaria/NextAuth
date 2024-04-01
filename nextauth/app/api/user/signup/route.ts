import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/databases/user.model";
import { sendEmail } from "@/utils/mailer";
export async function POST(req: NextRequest) {
    connectToDatabase();

    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody

        console.log(reqBody);

        if (!username || !email || !password) {
            return NextResponse.json({ error: "Please fill all fields" }, { status: 400 })
        }

        const UseralreadyExists = await User.findOne({
            email
        })

        console.log(UseralreadyExists)
        if (UseralreadyExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }


        // hash the password before saving it to the database
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,

        })
        console.log(newUser, "User is Created Successfully")


        // seding the email and username to the client
        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id })


        return NextResponse.json({
            username, email, password,
            messagee: "User created Successfullly"
        }, { status: 200 },
        )

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }




}