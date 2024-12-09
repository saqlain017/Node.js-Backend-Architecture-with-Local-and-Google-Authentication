import { User } from '../models/userModel.js'
import Session from '../models/session.js';
import { hashPassword, validatePassword, isValidEmail, isValidPassword } from '../utils/utils.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { JWT_SECRET } from '../config/env.js';

// Register a new user manually
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, accountType } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json(
        errorResponse(400, 'Invalid email', 'ERR_INVALID_EMAIL')
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        errorResponse(400, 'User already exists', 'ERR_USER_EXISTS')
      );
    }
    if (!isValidPassword(password)){
      return res.status(400).json(
        errorResponse(400, 'Invalid Password', 'Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, and one number.')
      );
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      accountType,
      userRole: 1,
      authProvider: 'local'
    });
    await user.save();

    res.status(201).json(
      successResponse(201, 'User created successfully', { user })
    );
  } catch (error) {
    res.status(500).json(
      errorResponse(500, 'Server error', 'ERR_SERVER_ERROR', { error })
    );
  }
};

// Login for manual users
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(
        errorResponse(401, 'Invalid email or password', 'ERR_INVALID_LOGIN')
      );
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json(
        errorResponse(401, 'Invalid email or password', 'ERR_INVALID_LOGIN')
      );
    }

    const { token, csrfToken } = await Session.initSession(user._id);
    if(token && csrfToken){
      res.status(200).json(
        successResponse(200, 'Login successful', { token, csrfToken, name: user.name, email: user.email })
      );
    }
    else{
      res.status(500).json(
        errorResponse(500, 'Server error', 'ERR_SERVER_ERROR', { error })
      );
    }
  } catch (error) {
    res.status(500).json(
      errorResponse(500, 'Server error', 'ERR_SERVER_ERROR', { error })
    );
  }
};

// Google authentication
export const googleAuth =  async(req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    const user = req.user;
    if (!user) {
      return res.redirect(`${baseUrl}/login?error=auth_failed`);
    }
    if (!JWT_SECRET) {
      return res.redirect(
        `${baseUrl}/login?error=server_configuration_error`
      );
    }
    const { token, csrfToken } = await Session.initSession(user._id);
    res.redirect(
      `${baseUrl}/auth/callback?token=${token}&csrfToken=${csrfToken}&id=${user._id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
    );
  } catch (error) {
    res.redirect(
      `${baseUrl}/login?error=${encodeURIComponent(error.message)}`
    );
  }
}

// Logout user
export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json(
        errorResponse(400, 'Un-authenticated', 'ERR_NO_TOKEN')
      );
    }
    await Session.expireSession(token);
    res.status(200).json(
      successResponse(200, 'Logged out successfully')
    );
  } catch (error) {
    res.status(500).json(
      errorResponse(500, 'Server error', 'ERR_LOGOUT_FAILED', { error })
    );
  }
};

// Logout user from all devices
export const logoutFromAllDevices = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json(
        errorResponse(400, 'Un-authenticated', 'ERR_NO_TOKEN')
      );
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json(
        errorResponse(404, 'User not found', 'ERR_USER_NOT_FOUND')
      );
    }
    await Session.expireAllForUsers(user._id);
    res.status(200).json(
      successResponse(200, 'Logged out from all devices successfully')
    );
  } catch (error) {
    res.status(500).json(
      errorResponse(500, 'Server error', 'ERR_LOGOUT_FAILED', { error })
    );
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json(
        errorResponse(400, 'Un-authenticated', 'ERR_NO_TOKEN')
      );
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json( 
        errorResponse(404, 'User not found', 'ERR_USER_NOT_FOUND')
      );
    }
    await User.findByIdAndDelete(req.user.userId);
    await Session.expireAllForUsers(user._id);
    res.status(200).json(
      successResponse(200, 'User deleted successfully')
    );
  } catch (error) {
    res.status(500).json(
      errorResponse(500, 'Server error', 'ERR_DELETE_USER_FAILED', { error })
    );
  }
};
