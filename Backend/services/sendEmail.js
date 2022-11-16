const nodemailer = require("nodemailer");

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_FROM_ADDRESS,
            to: email,
            subject: subject,
            text: text,
        });

    } catch (error) {
        console.log(error, "email not sent");
        throw Error("Cannot sent Email");
    }
}

module.exports = {
    sendEmail
};