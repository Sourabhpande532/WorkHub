const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name is required."],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "company name is required."],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Full-time (On-site)",
        "Part-time (On-site)",
        "Full-time (Remote)",
        "Part-time (Remote)",
        "Internship",
        "Contract",
      ],
      required: true,
    },
    salary: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
      trim: true,
    },
    qualification: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Job", jobSchema);
