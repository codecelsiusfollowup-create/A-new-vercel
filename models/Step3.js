import mongoose from "mongoose";

const step3Schema = new mongoose.Schema({
    configuration: {
        totalRooms: { type: Number, required: true },
        washrooms: { type: Number, required: true },
        balconies: { type: Number, required: true },
        floorNo: { type: String, required: true },
        totalFloors: { type: Number, required: true },
        furnishing: { type: String, required: true },
        furnishingDetails: [{ type: String }], // Optional
        otherRooms: [{ type: String }], // Optional
        coveredParking: { type: Number, required: true },
        openParking: { type: Number, required: true },
    },
    areaDetails: {
        carpet: { type: Number, required: true },
        carpetUnit: { type: String, required: true },
        builtUp: { type: Number },
        builtUpUnit: { type: String },
        superBuiltUp: { type: Number },
        superBuiltUpUnit: { type: String },
    },
    availability: { type: String, required: true },
    possessionBy: { type: String },
    age: { type: String },
});

export default step3Schema;