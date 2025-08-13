import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import transporter from "../config/nodemailer.js"



const register = async (req, res) => {

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required."})
    }
    
    const checkUser = await User.findOne({email});
    
    if (checkUser) {
        return res.status(400).json({success: false, message: "Email already exists."})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpExpiry = Date.now() + 5 * 60 * 1000

    const user = new User({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry
    });
    await user.save()

    await transporter.sendMail({
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: "OTP Verification - Notes App",
        html: `
            <p>Click the link below and enter OTP there</p>
            <a href="${process.env.FRONTEND_URL}/verify-otp/${user.id}">${process.env.FRONTEND_URL}/verify-otp/${user.id}</a>
            <p style="background-color: rgb(5, 123, 5); letter-spacing: 20px; color: #fff; width: fit-content; padding: 8px 12px; border-radius: 6px;" >${otp}</p>
        `,
    })

    return res.status(201).json({success: true, userId: user.id, message: "User created successfully. Mail has been sent."});

}

const login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).json({success: false, message: "Invalid email or password."})
    }

    if (!user.isVerified) {
        return res.status(400).json({success: false, message: "Account not verified!"})
    }
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        return res.status(404).json({success: false, message: "Invalid email or password."})
    }

    const token = jwt.sign({id: user.id}, process.env.SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 24 * 60 * 60 * 1000,
    })
    
    return res.status(200).json({success: true, message: "Logged in"})
}

const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    const user = await User.findById(userId)

    if (!user) {
        return res.status(401).json({success: false, message: "Invalid link or User ID."});
    }

    if (otp != user.otp) {
        return res.status(401).json({success: false, message: "Invalid OTP."});
    } 
    
    if (Date.now() > user.otpExpiry) {
        await user.deleteOne()

        return res.status(401).json({success: false, message: "OTP Expired. Register again."});
    }

    user.otp = null
    user.otpExpiry = null
    user.isVerified = true

    await user.save()

    return res.status(200).json({success: true, message: "Account has been Verified."});

}

const check = async (req, res) => {
    const { userId } = req
    
    const user = await User.findById(userId);

    if (!user) {
        return res.status(401).json({success: false, message: "Invalid token."});
    }

    return res.status(200).json({success: true, message: "Already loggedin"});
}

const getProfile = async (req, res)=>{
    const { userId } = req

    try {
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({success: true, data: user});

    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

const setProfile = async (req, res)=>{
    const { userId } = req;
    const { action } = req.body;
    
    if (action === "general") {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({success: false, message: "All fields are required."});
        }

        try {
            await User.findByIdAndUpdate(userId, {
                name, email
            })
            return res.status(200).json({success: true, message: "Information updated."});
        } catch (error) {
            return res.status(400).json({success: false, message: error.message});
        }
        
    } else {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(401).json({success: false, message: "All fields are required."});
        }

        try {
            const user = await User.findById(userId);

            const match = await bcrypt.compare(oldPassword, user.password);

            if (!match) {
                return res.status(400).json({success: false, message: "Invalid Old Password."});
            }
            
            if (newPassword !== confirmPassword) {
                return res.status(400).json({success: false, message: "New Password and confirm password doesnot match."});
            }
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            
            user.password = hashedPassword;
            
            await user.save()
            
            return res.status(200).json({success: true, message: "Password updated."});


        } catch (error) {
            return res.status(400).json({success: false, message: error.message});
        }

    }
}

const logout = (req, res)=>{
    res.clearCookie("token")

    return res.status(200).json({success:true, message: "Logout successfully."})
}


export {
    register, login, verifyOtp, check, getProfile, setProfile, logout
}