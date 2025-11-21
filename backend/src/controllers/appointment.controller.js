import Appointment from '../models/Appointment.model.js';
import Availability from '../models/Availability.model.js';
import User from '../models/User.model.js';

// Patient Controllers
export const bookAppointment = async (req, res, next) => {
  try {
    const { providerId, appointmentDate, reason, duration } = req.body;
    const patientId = req.user.userId;

    // Verify provider exists
    const provider = await User.findOne({ _id: providerId, role: 'provider' });
    if (!provider) {
      return res.status(404).json({ 
        success: false, 
        message: 'Provider not found' 
      });
    }

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      providerId,
      appointmentDate,
      status: { $in: ['pending', 'approved'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({ 
        success: false, 
        message: 'This time slot is already booked' 
      });
    }

    const appointment = await Appointment.create({
      patientId,
      providerId,
      appointmentDate,
      reason,
      duration: duration || 30
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { appointment }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientAppointments = async (req, res, next) => {
  try {
    const patientId = req.user.userId;

    const appointments = await Appointment.find({ patientId })
      .populate('providerId', 'username email')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      data: { appointments }
    });
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const patientId = req.user.userId;

    const appointment = await Appointment.findOne({ 
      _id: appointmentId, 
      patientId 
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot cancel this appointment' 
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: { appointment }
    });
  } catch (error) {
    next(error);
  }
};

export const rescheduleAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate } = req.body;
    const patientId = req.user.userId;

    const appointment = await Appointment.findOne({ 
      _id: appointmentId, 
      patientId 
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // Check for conflicts
    const conflictingAppointment = await Appointment.findOne({
      _id: { $ne: appointmentId },
      providerId: appointment.providerId,
      appointmentDate,
      status: { $in: ['pending', 'approved'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({ 
        success: false, 
        message: 'This time slot is already booked' 
      });
    }

    appointment.appointmentDate = appointmentDate;
    appointment.status = 'pending'; // Reset to pending
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment rescheduled successfully',
      data: { appointment }
    });
  } catch (error) {
    next(error);
  }
};

// Provider Controllers
export const getProviderAppointments = async (req, res, next) => {
  try {
    const providerId = req.user.userId;

    const appointments = await Appointment.find({ providerId })
      .populate('patientId', 'username email')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      data: { appointments }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { status, rejectionReason, notes } = req.body;
    const providerId = req.user.userId;

    const appointment = await Appointment.findOne({ 
      _id: appointmentId, 
      providerId 
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    appointment.status = status;
    if (notes) appointment.notes = notes;
    if (status === 'rejected' && rejectionReason) {
      appointment.rejectionReason = rejectionReason;
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: { appointment }
    });
  } catch (error) {
    next(error);
  }
};

export const setAvailability = async (req, res, next) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const providerId = req.user.userId;

    const availability = await Availability.create({
      providerId,
      dayOfWeek,
      startTime,
      endTime
    });

    res.status(201).json({
      success: true,
      message: 'Availability set successfully',
      data: { availability }
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailability = async (req, res, next) => {
  try {
    const providerId = req.user.userId;

    const availability = await Availability.find({ providerId, isActive: true })
      .sort({ dayOfWeek: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      data: { availability }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAvailability = async (req, res, next) => {
  try {
    const { availabilityId } = req.params;
    const providerId = req.user.userId;

    const availability = await Availability.findOneAndDelete({ 
      _id: availabilityId, 
      providerId 
    });

    if (!availability) {
      return res.status(404).json({ 
        success: false, 
        message: 'Availability not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Availability deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProviders = async (req, res, next) => {
  try {
    const providers = await User.find({ role: 'provider' })
      .select('-password -refreshToken');

    res.status(200).json({
      success: true,
      data: { providers }
    });
  } catch (error) {
    next(error);
  }
};
