import express from "express"
import { logout, signin, signup } from "../controllers/Auth.js";
import { verifyingSignin, verifyingSignup } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", verifyingSignup, signup);
router.post("/signin", verifyingSignin, signin);
router.get("/logout", logout);


export default router;