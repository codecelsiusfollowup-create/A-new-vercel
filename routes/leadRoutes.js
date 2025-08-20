import express from "express";
import { createLead, getLeads, getLeadById, updateLead, deleteLead } from "../controllers/leadController.js";

const router = express.Router();

// Routes
router.post("/", createLead);       // Create Lead
router.get("/", getLeads);          // Get all Leads
router.get("/:id", getLeadById);    // Get lead by ID
router.put("/:id", updateLead);     // Update lead
router.delete("/:id", deleteLead);  // Delete lead

export default router;