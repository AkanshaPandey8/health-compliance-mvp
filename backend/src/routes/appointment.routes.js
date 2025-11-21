import express from 'express';
import { 
  bookAppointment,
  getPatientAppointments,
  cancelAppointment,
  rescheduleAppointment,
  getProviderAppointments,
  updateAppointmentStatus,
  setAvailability,
  getAvailability,
  deleteAvailability,
  getAllProviders
} from '../controllers/appointment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// Public route - get all providers
router.get('/providers', getAllProviders);

// Patient routes
router.use(authenticate);
router.post('/book', authorize('patient'), bookAppointment);
router.get('/patient/appointments', authorize('patient'), getPatientAppointments);
router.patch('/patient/:appointmentId/cancel', authorize('patient'), cancelAppointment);
router.patch('/patient/:appointmentId/reschedule', authorize('patient'), rescheduleAppointment);

// Provider routes
router.get('/provider/appointments', authorize('provider'), getProviderAppointments);
router.patch('/provider/:appointmentId/status', authorize('provider'), updateAppointmentStatus);
router.post('/provider/availability', authorize('provider'), setAvailability);
router.get('/provider/availability', authorize('provider'), getAvailability);
router.delete('/provider/availability/:availabilityId', authorize('provider'), deleteAvailability);

export default router;
