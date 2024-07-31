import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirments,
      salary,
      location,
      jobtype,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirments ||
      !salary ||
      !location ||
      !jobtype ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill all of the details",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirments: requirments.split(","),
      salary: Number(salary),
      location,
      jobtype,
      experienceLevel: experience,
      position,
      company: companyId,
      createdby: userId,
    });
    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const job = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
    if (!job) {
      return res.status(400).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications");
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//jobs created by admin find hear

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({createdby:adminId}).populate("company");
    if (!jobs) {
        return res.status(400).json({
          message: "Jobs not found",
          success: false,
        });
      }
      return res.status(200).json({
        jobs,
        success: true,
      });
  } catch (error) {
    console.log(error)
  }
};
