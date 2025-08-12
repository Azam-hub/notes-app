import { Router } from "express";
import { check, login, getProfile, register, verifyOtp, setProfile, logout } from "../controllers/authController.js";
import loggedin from "../middlewares/loggedin.js";


const authRoutes = Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post("/verify-otp", verifyOtp)

authRoutes.get("/check", loggedin, check)
authRoutes.get("/get-profile", loggedin, getProfile)
authRoutes.post("/set-profile", loggedin, setProfile)
authRoutes.post("/logout", loggedin, logout)
// authRoutes.get("/set-password", loggedin, getProfile)


export default authRoutes