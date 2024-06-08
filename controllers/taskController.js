const Task = require("../models/taskModel");

exports.getTasks = (req, res) => {
    Task.find()
    .then((all_tasks) => {
        const tasks = all_tasks.filter(
          (task) => task.status === "Pending" || task.status === "Running"
        );
        // Order tasks by attribute time (lexicographically)
        tasks.sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
        // Order notifications of each task by date_hour (lexicographically)
        tasks.forEach((task) => {
            if (task.notifications_info) {
                task.notifications_info.notifications.sort((a, b) => {
                    return a.date_hour.localeCompare(b.date_hour);
                });
            }
        });
        res.json(tasks);
    })
        .catch((err) => res.status(400).json("Task.find() Error: " + err));
}