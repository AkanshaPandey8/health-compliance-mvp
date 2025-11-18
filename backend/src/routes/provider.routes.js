import express from 'express';
import { 
  getAllPatients, 
  getPatientById, 
  getPatientGoals 
} from '../controllers/provider.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication and provider role
router.use(authenticate);
router.use(authorize('provider'));

router.get('/patients', getAllPatients);
router.get('/patients/:patientId', getPatientById);
router.get('/patients/:patientId/goals', getPatientGoals);

export default router;
