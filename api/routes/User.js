import express from "express"
import { getListings, test, updateUser } from "../controllers/User.js";
import { verifyUser } from "../middlewares/User.js";
const router = express.Router();

router.get("/test", test)
router.put('/update/:id', verifyUser, updateUser)
router.get('/listings/:id', verifyUser, getListings)

export default router;