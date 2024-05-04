import express from 'express';
import { listing } from '../controllers/ListingController.js';
import { verifyUser } from '../middlewares/User.js';

const router = express.Router();

router.post("/create", verifyUser, listing);

export default router;