const express = require('express');
const {getTaskById, updateTask, deleteTask} = require('../models/tasks_db');
const { tokenAuthenticationMiddleware, loginRequiredMiddleware } = require('./authentication_middlewares');

const router = express.Router();
router.use(express.json());

router.get('/:taskId', loginRequiredMiddleware, async (req, res) => {
    const taskId = req.params.taskId;
    const task = await getTaskById(taskId);
    if (!task) {
      return  res.status(404).render('not-found', {
        subtitle: 'Task Not Found',
        owner: req.session.user
      });
    }

    res.render('task', {
        subtitle: task.title,
        owner: req.session.user,
        task
    });
});

router.put('/:taskId',tokenAuthenticationMiddleware, async (req, res) => {
    const taskId = req.params.taskId;
    const matchingTask = await getTaskById(taskId);
    if (!matchingTask|| matchingTask.creator.username !== req.username) {
        return res.status(403).json({error: `You don't have permission to update this task`});
    }
    const task = await updateTask(taskId, req.body);
    if (!task) {
      return  res.status(404).json({error: `Task with id ${taskId} not found`});
    }
    res.json(task);
});

router.delete('/:taskId',tokenAuthenticationMiddleware, async (req, res) => {
    const taskId = req.params.taskId;
    const matchingTask = await getTaskById(taskId);
    if (!matchingTask|| matchingTask.creator.username !== req.username) {
        return res.status(403).json({error: `You don't have permission to delete this task`});
    }
    const task = await deleteTask(taskId);
    if (!task) {
      return  res.status(404).json({error: `Task with id ${taskId} not found`});
    }
    res.sendStatus(204);
});

module.exports = router;
