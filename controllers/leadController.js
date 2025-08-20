import Lead from "../models/Lead.js";

// ✅ Create Lead
export const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ success: true, message: "Lead created successfully", data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating lead", error: error.message });
  }
};

// ✅ Get All Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching leads", error: error.message });
  }
};

// ✅ Get Single Lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching lead", error: error.message });
  }
};

// ✅ Update Lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, message: "Lead updated successfully", data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating lead", error: error.message });
  }
};

// ✅ Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting lead", error: error.message });
  }
};