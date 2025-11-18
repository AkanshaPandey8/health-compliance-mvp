import express from 'express';
import { getHealthInfo, getPrivacyPolicy } from '../controllers/public.controller.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/health-info', getHealthInfo);
router.get('/privacy-policy', getPrivacyPolicy);

export default router;
