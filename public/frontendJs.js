async function deleteTask(taskId) {
    const token = localStorage.getItem('token');
    if (!token) {
        document.location.href = '/auth';
    } else {
        if (confirm('Are you sure you want to delete this task?')) {
            console.log(`Deleting task with id: ${taskId}`);
            const response = await fetch(`/task/${taskId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            if (response.ok) {
                document.location.href = '/';
            } else {
                const message = await response.json();
                alert(message.error);
            }
        }
    }
}

async function markDone(taskId) {
    const token = localStorage.getItem('token');
    if (!token) {
        document.location.href = '/auth';
    } else {
        console.log(`Task with id ${taskId} marked as done`);

        const response = await fetch(`/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            const message = await response.json()
            alert(message.error);
        }
    }
}

let mode = 'login';

function toggleForm(toggleButton) {
    const submitButton = document.querySelector('[type="submit"]');
    if (mode === 'login') {
        toggleButton.textContent = 'Or Click Here to Login';
        mode = 'register';
        submitButton.textContent = 'Register';
    } else {
        toggleButton.textContent = 'Or Click Here to Register';
        mode = 'login';
        submitButton.textContent = 'Login';
    }
}

const formElement = document.querySelector('#loginForm');
if (formElement) {
    formElement.addEventListener('submit', loginOrRegister);
}

async function loginOrRegister(evt) {
    evt.preventDefault();
    const formData = new FormData(formElement);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('/auth/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    if (response.ok) {
        const jwt = await response.json();
        localStorage.setItem('token', jwt.token);
        document.location.href = '/';
    } else {
        const errorsDiv = document.querySelector('.task');
        const message = await response.json();
        errorsDiv.textContent = message.error;
        errorsDiv.style.display = 'block'
    }
}

async function logout() {
    await fetch('/auth/logout', {
        method: 'POST',
    });

    localStorage.removeItem('token');
    document.location.href = '/';
}
