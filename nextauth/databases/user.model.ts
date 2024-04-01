import { Schema, models, model, Document } from 'mongoose';


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerifed: boolean;
    isAdmin?: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExpire?: Date;
    verifytoken?: string;
    verifytokenExpire?: Date;
}


const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isVerifed: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpire: {
        type: Date,
    },
    verifytoken: {
        type: String,
    },
    verifytokenExpire: {
        type: Date,
    },
});


const User = models.User || model('User', userSchema);

export default User;


