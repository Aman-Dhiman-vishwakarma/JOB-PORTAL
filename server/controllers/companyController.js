import { Company } from "../models/companyModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudnary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same Company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userid: req.id,
    });

    return res.status(200).json({
      message: "Company register successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userid: userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "These company you are registered",
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    //logo cloudnary is pending
    const file = req.file;

    let cloudresponce;

    if(file){
      const fileUri = getDataUri(file);
      cloudresponce = await cloudinary.uploader.upload(fileUri.content)
    }

    const updatedData = { name, description, website, location, logo: cloudresponce?.secure_url || "" };
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!company) {
        return res.status(400).json({
          message: "Company not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message:"Company information updated successfully",
        company,
        success: true,
      });
     
  } catch (error) {
    console.log(error);
  }
};
