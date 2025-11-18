import express from 'express';
import { getProfile, updateProfile } from '../controllers/patient.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication and patient role
router.use(authenticate);
router.use(authorize('patient'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
