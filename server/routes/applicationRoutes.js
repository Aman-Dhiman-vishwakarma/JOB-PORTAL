import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicationController.js';
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob)
router.route("/get").get(isAuthenticated, getAppliedJobs)
router.route("/applicants/:id").get(isAuthenticated, getApplicants)
router.route("/updatestatus/:id").post(isAuthenticated, updateStatus)

export default router;