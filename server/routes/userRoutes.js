import express from 'express'
import { login, logout, register, updateprofile } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUplode } from '../middlewares/multer.js';
const router = express.Router();

router.route("/register").post(singleUplode, register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated, singleUplode, updateprofile)
router.route("/logout").get(logout)

export default router;