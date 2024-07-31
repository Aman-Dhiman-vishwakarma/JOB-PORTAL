import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      reqired: true,
    },
    description: {
      type: String,
      reqired: true,
    },
    requirments: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
      reqired: true,
    },
    experienceLevel: {
      type: Number,
      reqired: true,
    },
    location: {
      type: String,
      reqired: true,
    },
    jobtype: {
      type: String,
      reqired: true,
    },
    position: {
      type: Number,
      reqired: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      reqired: true,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
