import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String, 
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    otp: {
        type: Number,
    },
    otpExpiry: {
        type: Number,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User