import express from "express"
import { test, updateUser } from "../controllers/User.js";
import { verifyUser } from "../middlewares/User.js";
const router = express.Router();

router.get("/test", test)
router.put('/update/:id', verifyUser, updateUser)

export default router;