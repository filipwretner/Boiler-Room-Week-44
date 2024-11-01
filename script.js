class task {
    constructor(taskID, taskDescription, isComplete) {
        this.taskID = taskID
        this.taskDescription = taskDescription;
        this.isComplete = isComplete;
    }
}

function mainMenu() {

}

function addToDo() {
    // Generate a unique ID
    let newID;
    do {
        newID = Math.random();
    } while (toDoList.some(task => task.taskID === newID)); // Check if ID is in use

    //Create and return new task
    let newTask = new task(newID, prompt(), false);
    return newTask;
}

function showToDo() {

}

function markAsComplete() {

}

function deleteToDo() {

}