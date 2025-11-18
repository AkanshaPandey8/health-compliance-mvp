import Profile from '../models/Profile.model.js';
import User from '../models/User.model.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId })
      .populate('userId', '-password -refreshToken');

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, dateOfBirth, phone, address, medicalHistory } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        firstName,
        lastName,
        dateOfBirth,
        phone,
        address,
        medicalHistory
      },
      { new: true, runValidators: true }
    ).populate('userId', '-password -refreshToken');

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};
