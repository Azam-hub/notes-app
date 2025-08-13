import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NODE_MAILER_EMAIL, // -- Your sender Email
        pass: process.env.NODE_MAILER_EMAIL_PASSWORD, // -- Your Sender Email Password
    },
})

export default transporter;