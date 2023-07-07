require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const userOtpVerfication = require('../models/userOtp.verification');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
const createOTP = async (email)=>{
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(otp,saltRounds);
    const newOptVerification = await userOtpVerfication.create({
        userId: email,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 300000, 
    })
    return otp;
}
const otpVerification = async (email, otp) => {
    if (!otp) {
        throw new Error("Please enter OTP for verification");
    } else {
        const userOtpVerificationRecord = await userOtp.findOne({ userId:email });
        console.log(userOtpVerificationRecord);
        if (!userOtpVerificationRecord) {
            throw new Error("Account record doesn't exist. Please sign up or login.");
        } else {
            const { expiresAt, otp: hashedOtp } = userOtpVerificationRecord;
            console.log("OTP:", otp);
            console.log("Hashed OTP:", hashedOtp);
            const validOtp = await bcrypt.compare(otp, hashedOtp);
            if (!validOtp) {
                throw new BadRequestError("invalid otp, please check and try again");
            } else if (expiresAt < Date.now()) {

                throw new Error("Code has expired. Please request again.");
            }
            else {
                return validOtp;
            }

        }
    }
};
const sendVerificationEmail = async ( {_id, email},link, res) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: ' Verify your Email',
        html: `<p>please click the link below to verify your email</p></br>
        <a href="${link}">${link}</a>`
    }, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent successfully!');
        }
    });
    res.json({
        status:"PENDING",
        Message:"verification email sent",
        Data:{
            userId: _id,
            email:email,
            link: link
        },
    })
}
const sendOtpVerificationEmail = async ( {_id, email },token, res) => {
    const otp = await createOTP(email)
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: ' Verify your Email',
        html: `<p>enter <b>${otp}</b> in the app to verify your email address and complete the process</p></br>
        <p>This code <b> expires in 5 minutes</b></p>`
    }, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent successfully!');
        }
    });
    res.json({
        status:"PENDING",
        Message:"verification otp sent",
        Data:{
            userId: _id,
            email:email
        },
        token:token
    })
}
const resendOtpVerificationCode = async (req, res) => {
    try {
        let { email, userId } = req.body;
        if (!email || !userId) {
            throw new Error("empty user details are not allowed");
        } else {
            await userOtpVerification.deleteMany({ userId });
            await sendOtpVerificationEmail({ _id: userId, email }, res);
        }
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = { sendVerificationEmail, sendOtpVerificationEmail, resendOtpVerificationCode,otpVerification }