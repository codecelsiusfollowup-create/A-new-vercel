import mongoose from 'mongoose';
import step3Schema from './Step3.js';

const propertySchema = new mongoose.Schema({
  // Step 1 Fields:
  listingType: {
    type: String,
    enum: ['Sell', 'Rent / Lease', 'PG'],
    required: true,
  },
  propertyUse: {
    type: String,
    enum: ['Residential', 'Commercial'],
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
    default: null, // only required if commercial type has subType
  },
  extraInfo: {
    type: String,
    default: null,
  },
  shopLocation: {
    type: String,
    enum: [
      'Mall',
      'Commercial Project',
      'Residential Project',
      'Retail Complex/Building',
      'Market / High Street',
      'Others',
      null,
    ],
    default: null,
  },
  // ... Step 2 fields here

  location: {
    city: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    subLocality: {
      type: String,
      default: null,
    },
    project: {
      type: String,
      default: null,
    },
    coordinates: {
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
    },
  },

  // Step 3: Property Features
  step3:step3Schema,

  // Step 4: Media
  photos: [
    {
      name: { type: String },
      type: {
        type: String,
        enum: ["Washroom", "Floor Plan", "Building", "Living Room", "Bedroom"],
        default: "Washroom"
      },
      url: { type: String, required: true },
    }
  ],
  videos: [
    {
      name: { type: String },
      url: { type: String, required: true },
    }
  ],

  // Step 5: Pricing
  price: {
    type: Number,
    required: true,
    min: [1, 'Price must be greater than zero'],
  },
  pricePerSqFt: {
    type: Number,
    required: true,
    min: [1, 'Price per square foot must be greater than zero'],
  },
  priceBasis: {
    type: String,
    enum: ['Plot Area', 'Carpet Area'],
    default: 'Plot Area',
  },
  taxExcluded: {
    type: Boolean,
    default: true,
  },
  negotiable: {
    type: Boolean,
    default: true,
  },
  maintenance: {
    type: Number,
    default: null,
  },
  maintenanceType: {
    type: String,
    enum: ['Monthly', 'Yearly'],
    default: 'Monthly',
  },
  expectedRental: {
    type: Number,
    default: null,
  },
  bookingAmount: {
    type: Number,
    default: null,
  },
  annualDues: {
    type: Number,
    default: null,
  },
  ownership: {
    type: String,
    enum: ['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney'],
    default: 'Freehold',
  },
  chargeBrokerage: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
  brokerageType: {
    type: String,
    enum: ['Fixed', 'Percentage of Price'],
    default: 'Fixed',
  },
  brokerageValue: {
    type: Number,
    default: null,
    validate: {
      validator: function (val) {
        // Only validate if brokerage is charged
        if (this.chargeBrokerage === 'Yes') {
          return val > 0;
        }
        return true;
      },
      message: 'Brokerage value must be greater than zero',
    },
  },
  brokerageNegotiable: {
    type: Boolean,
    default: false,
  },
  propertyDescription: {
    type: String,
    required: true,
    minlength: [30, 'Description must be at least 30 characters'],
    maxlength: [5000, 'Description can be at most 5000 characters'],
  },

  // Step 6: Optional Details
  selectedAmenities: {
    type: [String],
    default: [],
  },
  selectedFeatures: {
    type: [String],
    default: [],
  },
  selectedSocietyFeatures: {
    type: [String],
    default: [],
  },
  selectedAdditionalFeatures: {
    type: [String],
    default: [],
  },
  selectedWaterSources: {
    type: [String],
    default: [],
  },
  selectedOverlooking: {
    type: [String],
    default: [],
  },
  otherFeatures: {
    type: [String],
    default: [],
  },
  powerBackup: {
    type: String,
    enum: ["None", "Partial", "Full"],
    default: "None",
  },
  propertyFacing: {
    type: String,
    enum: [
      "North", "South", "East", "West",
      "North-East", "North-West", "South-East", "South-West"
    ],
    required: [true, "Property facing is required"],
  },
  flooringType: {
    type: String,
    enum: [
      "Marble", "Concrete", "Polished concrete", "Granite",
      "Ceramic", "Vitrified", "Wooden", "Mosaic"
    ],
    required: [true, "Flooring type is required"],
  },
  roadWidth: {
    type: Number,
    required: [true, "Road width is required"],
    min: [1, "Road width must be greater than 0"],
  },
  roadUnit: {
    type: String,
    enum: ["Feet", "Meter"],
    required: [true, "Road unit is required"],
  },
  locationAdvantage1: {
    type: [String],
    default: [],
  },

  // Step 7: Agent / Owner Contact
  reraStatus: {
    type: String,
    enum: ["Yes", "I have applied", "Not Applicable"],
    required: [true, "RERA status is required"],
  },
  licenseType: {
    type: String,
    enum: ["Individual", "Firm"],
    required: [true, "License type is required"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  companyURL: {
    type: String,
    trim: true,
  },
  address1: {
    type: String,
    required: [true, "Company address is required"],
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    enum: ["Godhra", "Ahmedabad", "Vadodara", "Surat"],
    required: [true, "City is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  mobile1: {
    type: String,
    required: [true, "Primary mobile number is required"],
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: "Enter a valid 10-digit mobile number",
    },
  },
  mobile2: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^[6-9]\d{9}$/.test(v);
      },
      message: "Enter a valid 10-digit mobile number",
    },
  },
  mobile3: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^[6-9]\d{9}$/.test(v);
      },
      message: "Enter a valid 10-digit mobile number",
    },
  },
  landline1: {
    type: String,
    trim: true,
  },
  landline2: {
    type: String,
    trim: true,
  },
  whatsappOptIn: {
    type: Boolean,
    default: false,
  },

  // Optional: If you plan to add RERA details conditionally
  reraDetails: {
    reraNumber: String,
    reraState: String,
    expiryDate: Date,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);