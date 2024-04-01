import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/databases/user.model';
interface EmailOptions {
    email: string;
    emailType: string,
    userId: string
}


export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {



    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // if the email type is verify then update the verifytoken and verifytokenExpire
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifytoken: hashedToken, verifytokenExpire: Date.now() + 3600000
            })
        }
        // if the email type is reset then update the forgotPasswordToken and forgotPasswordTokenExpiry     
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });


        const mailOption = {
            from: 'Nishitbaria@gmail.com', // sender address
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };




        const mailOptions = await transporter.sendMail(mailOption);

        return mailOptions;


    } catch (error) {
        console.log('Error sending email', error)
        throw new Error('Error sending email')
    }



}