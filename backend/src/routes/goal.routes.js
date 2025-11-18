import express from 'express';
import { 
  addGoal, 
  getGoals, 
  updateGoal, 
  deleteGoal,
  getGoalSummary 
} from '../controllers/goal.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication and patient role
router.use(authenticate);
router.use(authorize('patient'));

router.post('/', addGoal);
router.get('/', getGoals);
router.get('/summary', getGoalSummary);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);

export default router;
