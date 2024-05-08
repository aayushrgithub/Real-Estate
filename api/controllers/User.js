import bcrypt from "bcrypt"
import User from "../models/User.js";
import Listing from "../models/Listing.js";

export const test = (req, res) => {
    res.send("Hi from the server");
}

export const updateUser = async (req, res) => {
    if (req.params.id !== req.user._id.toHexString()) {
        res.send("Update yourself only")
    }
    else {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        }, { new: true })
        const { password: pass, ...rest } = updatedUser._doc;
        res.json({
            rest,
            success: true,
            message: "User updated successfully"
        })
    }
}

export const getListings = async (req, res) => {
    if (req.user._id.toHexString() === req.params.id) {
        const data = await Listing.find({ userRef: req.params.id });
        res.json(data)
    }
    else {
        res.send("You can only see your listings")
    }
}