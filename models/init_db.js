const {User, Task, createUser} = require('./tasks_db');

async function initDb() {
    try {
        await User.deleteMany({});
        await Task.deleteMany({});
        const users = []
        for (let i = 0; i < 2; i++) {
            users.push(await createUser({username: `user${i + 1}`, password: `password${i + 1}`}));
        }

        for (let i = 0; i < 3; i++) {
            await Task.create({
                title: `Task ${i + 1}`,
                description: `Description of Task ${i + 1}`,
                imageUrl: `/images/task${i + 1}.jpg`,
                creator: users[i % 2]._id
            });
        }
    } catch (err) {
        console.error(err);
    }
}

initDb().then(() => console.log('DB initialized'));

