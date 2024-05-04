import Listing from "../models/Listing.js"

export const listing = async (req, res) => {
    const listing = await Listing.create(req.body);
    res.json(listing);
}