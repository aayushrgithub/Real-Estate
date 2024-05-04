import jwt from 'jsonwebtoken'
import User from '../models/User.js';
export const verifyUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.send("Sign in first");
    }
    else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    }
}