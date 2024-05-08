import express from 'express';
import { deleteListing, getAllListings, getListing, getListings, listing } from '../controllers/ListingController.js';
import { verifyUser } from '../middlewares/User.js';

const router = express.Router();

router.post("/create", verifyUser, listing);
router.delete("/deleteListing/:id", verifyUser, deleteListing)
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.get('/getAll', getAllListings);



export default router;