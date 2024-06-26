const tasks = [
    {id: 1, title: 'test', description: 'Test the web app', done: false, creator: 'user1', isPublic: true, imageUrl: '/images/task1.jpg'},
    {id: 2, title: 'design', description: 'Design the frontend', done: true, creator: 'user1', isPublic: true, imageUrl: '/images/task2.jpg'},
    {id: 3, title: 'deploy', description: 'Deploy the web app', done: false, creator: 'user2', isPublic: false, imageUrl: '/images/task3.jpg'},
];

function getTasks(_sort='asc') {
    if (_sort === 'desc') {
        tasks.sort((a, b) => b.id - a.id);
    }
    else{
        tasks.sort((a, b) => a.id - b.id);
    }
    return tasks;
}

function getTaskById(taskId) {
    return tasks.find(task => task.id === parseInt(taskId));
}

function createTask(task) {
    const newTask = {
        id: tasks.length + 1,
        title: task.title,
        description: task.description,
        done: false,
        imageUrl: task.imageUrl,
    };
    console.log(newTask)
    tasks.push(newTask);
    return newTask;
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
};
