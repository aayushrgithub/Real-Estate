import Listing from "../models/Listing.js"

export const listing = async (req, res) => {
    const listing = await Listing.create(req.body);
    res.json(listing);
}

export const deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        res.send("No listing")
    }
    else {
        if (listing.userRef === req.user._id.toHexString()) {
            const data = await Listing.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                message: "Listing deleted successfully"
            })
        }
        else {
            res.send("Delete your own listing");
        }
    }
}

export const getListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        res.send("Currently no listing");
    }
    else {
        res.json({
            listing,
            success: true,
        })
    }
}

export const getListings = async (req, res) => {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
        offer = { $in: [true, false] }
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [true, false] }
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
        parking = { $in: [true, false] }
    }
    let type = req.query.type;
    if (type === undefined || type === 'all') {
        type = { $in: ["sale", "rent"] }
    }
    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";

    const data = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        parking,
        furnished,
        type,
    }).sort({ [sort]: order }).limit(limit).skip(startIndex);
    return res.json(data);
}

export const getAllListings = async (req, res) => {
    const data = await Listing.find({});
    if (!data) {
        res.send("No Listing here")
    }
    else {
        res.json(data)
    }
}