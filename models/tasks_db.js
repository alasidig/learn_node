const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');
const taskSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
    imageUrl: { type: String, default: '/images/logo.svg' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

async function getTasks(_sort = 'asc') {
    let tasks =  Task.find().populate('creator', 'username');
    if(_sort === 'desc') tasks.sort({ _id: -1 });
    else tasks.sort({ _id: 1 });
    return tasks;
}

async function getTaskById(taskId) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        console.log(`Invalid task id: ${taskId}`);
        return null;
    }
     // Prefetch the username of the creator
    return Task.findById(taskId)
        .populate('creator', 'username');
}

async function createTask(task) {
    let user = await User.findOne({ username: task.owner });
    if (!user) {
        throw new Error('User not found');
    }
    task.creator = user._id;
    task.isPublic = task.isPublic === 'on';// Convert 'on' to true
    return await Task.create(task);
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    User,
    Task,
};

