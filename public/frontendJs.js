function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        console.log(`Deleting task with id: ${taskId}`);
    }
}

function markDone(taskId) {
    console.log(`Task with id ${taskId} marked as done`);
}
