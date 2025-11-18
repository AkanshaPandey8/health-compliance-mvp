import Goal from '../models/Goal.model.js';
import { generateSummary } from '../services/gemini.service.js';

export const addGoal = async (req, res, next) => {
  try {
    const { steps, sleep, water, date, notes } = req.body;

    // Validate input
    if (steps === undefined || sleep === undefined || water === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide steps, sleep, and water intake' 
      });
    }

    // Check if goal already exists for this date
    const existingGoal = await Goal.findOne({
      userId: req.user.userId,
      date: date || new Date().toISOString().split('T')[0]
    });

    if (existingGoal) {
      return res.status(400).json({ 
        success: false, 
        message: 'Goal already exists for this date. Use update instead.' 
      });
    }

    const goal = await Goal.create({
      userId: req.user.userId,
      steps,
      sleep,
      water,
      date: date || new Date(),
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Goal added successfully',
      data: { goal }
    });
  } catch (error) {
    next(error);
  }
};

export const getGoals = async (req, res, next) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;

    const query = { userId: req.user.userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const goals = await Goal.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

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

export const updateGoal = async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const { steps, sleep, water, notes } = req.body;

    const goal = await Goal.findOne({
      _id: goalId,
      userId: req.user.userId
    });

    if (!goal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Goal not found' 
      });
    }

    // Update fields
    if (steps !== undefined) goal.steps = steps;
    if (sleep !== undefined) goal.sleep = sleep;
    if (water !== undefined) goal.water = water;
    if (notes !== undefined) goal.notes = notes;

    await goal.save();

    res.status(200).json({
      success: true,
      message: 'Goal updated successfully',
      data: { goal }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGoal = async (req, res, next) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: goalId,
      userId: req.user.userId
    });

    if (!goal) {
      return res.status(404).json({ 
        success: false, 
        message: 'Goal not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getGoalSummary = async (req, res, next) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .limit(7); // Last 7 days

    if (goals.length === 0) {
      return res.status(200).json({
        success: true,
        data: { 
          summary: 'No goals found for the past week.',
          goals: []
        }
      });
    }

    // Generate AI summary (mock or real Gemini API)
    const summary = await generateSummary(goals);

    res.status(200).json({
      success: true,
      data: { 
        summary,
        goals
      }
    });
  } catch (error) {
    next(error);
  }
};
