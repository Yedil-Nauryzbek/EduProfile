 const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Получить все задачи пользователя
router.get('/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка сервера' });
  }
});

// Добавить задачу
router.post('/', async (req, res) => {
  const { user, title, description, dueDate } = req.body;
  try {
    const task = new Task({ user, title, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка сервера' });
  }
});

// Обновить задачу
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка сервера' });
  }
});

// Удалить задачу
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ msg: 'Ошибка сервера' });
  }
});

module.exports = router;
  