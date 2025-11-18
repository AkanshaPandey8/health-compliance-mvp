import User from '../models/User.model.js';
import Profile from '../models/Profile.model.js';
import Goal from '../models/Goal.model.js';

export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await User.find({ role: 'patient' })
      .select('-password -refreshToken')
      .sort({ createdAt: -1 });

    // Get profiles for all patients
    const patientsWithProfiles = await Promise.all(
      patients.map(async (patient) => {
        const profile = await Profile.findOne({ userId: patient._id });
        return {
          ...patient.toJSON(),
          profile
        };
      })
    );

    res.status(200).json({
      success: true,
      data: { 
        patients: patientsWithProfiles,
        count: patientsWithProfiles.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const patient = await User.findOne({ 
      _id: patientId, 
      role: 'patient' 
    }).select('-password -refreshToken');

    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        message: 'Patient not found' 
      });
    }

    const profile = await Profile.findOne({ userId: patientId });

    res.status(200).json({
      success: true,
      data: { 
        patient: {
          ...patient.toJSON(),
          profile
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientGoals = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    // Verify patient exists
    const patient = await User.findOne({ 
      _id: patientId, 
      role: 'patient' 
    });

    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        message: 'Patient not found' 
      });
    }

    const goals = await Goal.find({ userId: patientId })
      .sort({ date: -1 })
      .limit(30); // Last 30 days

    res.status(200).json({
      success: true,
      data: { 
        goals,
        count: goals.length
      }
    });
  } catch (error) {
    next(error);
  }
};
