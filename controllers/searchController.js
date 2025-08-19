import Property from "../models/Property.js";

export const filterProperties = async (req, res) => {
  try {
    const {
      selectedTypes,
      selectedBedrooms,
      selectedStatus,
      selectedPostedBy,
      priceRange,
      intent,
      keyword,
      sort,
      page = 1,
      limit = 10,
    } = req.body;

    const filters = {};

    // 🔹 Intent = Sell / Rent / Lease
    if (intent) {
      filters.listingType = intent;
    }

    // 🔹 Property Types
    if (selectedTypes?.length > 0) {
      filters.propertyType = { $in: selectedTypes };
    }

    // 🔹 Bedroom (like 2 BHK → 2 totalRooms)
    if (selectedBedrooms?.length > 0) {
      const roomCounts = selectedBedrooms.flatMap((b) => {
        if (b.includes("1")) return [1];
        if (b.includes("2")) return [2];
        if (b.includes("3")) return [3];
        if (b.includes("4")) return [{ $gte: 4 }];
        return [];
      });
      filters["configuration.totalRooms"] = { $in: roomCounts };
    }

    // 🔹 Construction Status
    if (selectedStatus?.length > 0) {
      filters["areaDetails.availability"] = { $in: selectedStatus };
    }

    // 🔹 Posted By
    if (selectedPostedBy?.length > 0) {
      filters.postedBy = { $in: selectedPostedBy };
    }

    // 🔹 Price Range (convert Cr to ₹)
    if (priceRange?.length === 2) {
      filters.price = {
        $gte: priceRange[0] * 10000000,
        $lte: priceRange[1] * 10000000,
      };
    }

    // 🔹 Keyword-based Location Search
    if (keyword) {
      filters.$or = [
        { "location.city": { $regex: keyword, $options: "i" } },
        { "location.locality": { $regex: keyword, $options: "i" } },
        { "location.subLocality": { $regex: keyword, $options: "i" } },
        { "location.project": { $regex: keyword, $options: "i" } },
        { address1: { $regex: keyword, $options: "i" } },
        { address2: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
      ];
    }

    // 🔹 Pagination
    const skip = (page - 1) * limit;

    // 🔹 Sort Options
    let sortOption = {};
    if (sort === "lowToHigh") sortOption.price = 1;
    else if (sort === "highToLow") sortOption.price = -1;
    else sortOption._id = -1; // default: newest

    const properties = await Property.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filters);

    res.json({ properties, total });
  } catch (error) {
    console.error("Search filter error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};