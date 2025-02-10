class TaskManager {
    constructor () {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    runAll() {
        this.tasks.forEach((task) => {
            task.run()
        })
    }
}