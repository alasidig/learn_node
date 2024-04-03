const tasks = [
    {id: 1, title: 'test', description: 'Test the web app', done: false},
    {id: 2, title: 'design', description: 'Design the frontend', done: true},
    {id: 3, title: 'deploy', description: 'Deploy the web app', done: false},
];

function getTasks() {
    return tasks;
}

function getTaskById(taskId) {
    return tasks.find(task => task.id === taskId);
}

function createTask(task) {
    const newTask = {
        id: tasks.length + 1,
        title: task.title,
        description: task.description,
        done: false,
    };
    tasks.push(newTask);
    return newTask;
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
};
