import User from '../models/User.js';

// ✅ Get all staff for a dealer
export const getStaffByDealer = async (req, res) => {
  const { dealerId } = req.params;
  try {
    const staff = await User.find({ role: 'staff', dealerId });
    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Delete staff by ID
export const deleteStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Staff deleted successfully' });
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// GET all dealers
export const getAllDealers = async (req, res) => {
  try {
    const dealers = await User.find({ role: "dealer" }).select("-password");
    res.json(dealers);
  } catch (err) {
    console.error("Error fetching dealers:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE dealer
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Failed to delete user" });
  }
};