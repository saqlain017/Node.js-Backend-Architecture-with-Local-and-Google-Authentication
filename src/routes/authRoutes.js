import express from 'express';
import {
  registerUser,
  loginUser,
//   googleAuth,
  logoutUser,
  deleteUser,
  logoutFromAllDevices,
  googleAuth,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/custom/authenticate.js';
import passport from "passport";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.post('/logout-all', authenticate, logoutFromAllDevices);
router.delete('/delete', authenticate, deleteUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

export default router;
