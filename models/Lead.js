import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    leadSource: { type: String, trim: true },

    city: { type: String, trim: true },
    area: { type: String, trim: true },
    locality: { type: String, trim: true },

    property: { type: String, enum: ["residential", "commercial", "other"], trim: true },
    propertyType: { type: String, trim: true },
    typology: { type: String, trim: true },

    budget: { type: String, trim: true },
    facing: { type: String, trim: true },

    possessionType: { type: String, trim: true },
    possessionTime: { type: String, trim: true },

    projectName: { type: String, trim: true },
    remark: { type: String, trim: true },
    amenities: { type: String, trim: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
