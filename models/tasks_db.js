const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
async function updateTask(taskId, task) {
 try{
     return await Task.findByIdAndUpdate(taskId, task, {new: true});
 }
 catch (err) {
    console.error(err);
    return null;
 }   
}
async function deleteTask(taskId) {
    try {
        return await Task.findByIdAndDelete(taskId);
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createUser(user) {
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
        return null;
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({...user, password: hashedPassword});
    return await newUser.save();

}

async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    const authSuccess = await bcrypt.compare(password, user.password);
    return authSuccess ? user : null;
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createUser,
    authenticateUser,
    User,
    Task,
};

