import User from "@/databases/user.model";
import mongoose from "mongoose";


export async function getUserById(id: string) {
    try {
        const user = await User.findById(id);

        console.log(user);


        return user;
    } catch (error) {
        console.log(error);
    }
}