import Property from '../models/Property.js';



export const submitProperty = async (req, res) => {
  try {
    const { role, id } = req.user;

    // ✅ Check valid role
    if (!["admin", "dealer"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // ✅ Destructure request body
    const { photos = [], videos = [], ...other } = req.body;

    // ✅ Use URLs directly (uploaded from frontend)
    const photoUrls = photos.map(p => ({
      url: p.url,
      type: p.type || "image",
    }));

    const videoUrls = videos.map(v => v.url);

    // ✅ Create and save property
    const property = new Property({
      ...other,
      photos: photoUrls,
      videos: videoUrls,
      postedBy: id,
      userRole: role,
    });

    await property.save();
    res.status(201).json({
      success: true,
      message: "Property submitted successfully",
    });
  } catch (err) {
    console.error("Property submission error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Delete property by ID
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property deleted successfully",
      deletedProperty: deleted,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};