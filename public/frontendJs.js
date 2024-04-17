async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        console.log(`Deleting task with id: ${taskId}`);
        const response = await fetch(`/task/${taskId}`, {method: 'DELETE'});
        if (response.ok) {
            document.location.href = '/';
        } else {
            alert(`Failed to delete task with id ${taskId}`);
        }
    }
}

async function markDone(taskId) {
    console.log(`Task with id ${taskId} marked as done`);

    const response = await fetch(`/task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({done: true})
    });

    if (response.ok) {
        const taskDiv = document.querySelector('.task');
        taskDiv.classList.remove('pending')
        taskDiv.classList.add('done');
        const doneButton = taskDiv.querySelector('.done-button');
        doneButton.disabled = true;
    } else {
        alert('Failed to mark task as done');
    }
}
