import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.send("User Already exists")
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            username, email, password: hashedPassword
        })
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res.cookie('token', token).json({
            rest,
            success: true,
            message: "User created Successfully"
        })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.send("Register first")
    }
    else {
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            res.send("Wrong Credentials")
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.cookie('token', token).json({
                rest,
                success: true,
                message: "Logged in successfully"
            })

        }
    }
}

export const logout = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out successfully"
    })
}