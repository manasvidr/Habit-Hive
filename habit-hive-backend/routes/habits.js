import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// get all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create habit
router.post("/", async (req, res) => {
  try {
    const { title, goal = 1, unit = "" } = req.body;
    if (!title || typeof title !== "string") return res.status(400).json({ message: "Title required" });

    const newHabit = new Habit({
      title: title.trim(),
      goal: Number(goal) || 1,
      unit: unit ? unit.trim() : "",
      progress: 0,
      history: [],
    });

    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// increment habit
router.put("/:id/increment", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    habit.progress = Math.min((habit.progress || 0) + 1, habit.goal || Infinity);

    // update today entry in history
    const today = new Date();
    const idx = habit.history?.findIndex((h) => new Date(h.date).toDateString() === today.toDateString());
    if (idx >= 0) habit.history[idx].value = habit.progress;
    else habit.history.push({ date: today, value: habit.progress });

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// decrement habit
router.put("/:id/decrement", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    habit.progress = Math.max((habit.progress || 0) - 1, 0);

    const today = new Date();
    const idx = habit.history?.findIndex((h) => new Date(h.date).toDateString() === today.toDateString());
    if (idx >= 0) habit.history[idx].value = habit.progress;
    else habit.history.push({ date: today, value: habit.progress });

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// edit habit
router.put("/:id", async (req, res) => {
  try {
    const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete habit
router.delete("/:id", async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
