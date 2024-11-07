let toDoList = [];

// Getting the elements and assign them to variables
const taskForm = document.getElementById("taskForm"); // form
const taskInput = document.getElementById("taskInput"); // input
const taskList = document.getElementById("taskList"); // ul
const message = document.getElementById("message"); // paragraph for error message

function showToDo() {

    message.innerText = ""; // Empties the error message each time we run this function
    taskList.innerHTML = ""; // Empties the ul element each time we run this function, otherwise it adds the entire list everytime (example, if we have 1 item, then add a second one it adds both but the first remains in the list, so we reset it every time)

    toDoList.forEach(task => { // Adds HTML elements for each task in the main array

        const showTask = document.createElement("li"); // Creates list element
        showTask.className = task.isCompleted ? "completed" : ""; // Assigns the completed class if we marked it as complete
        showTask.dataset.id = task.taskID; // Assigns the ID we create when we add a task as the HTML id for every list item, we use this to easier mark tasks as complete and delete them

        const showDescription = document.createElement("p"); // Creates a paragraph for the description of the task
        showDescription.textContent = task.taskDescription;

        const completeTask = document.createElement("button"); // Creates a button for marking task as done
        completeTask.className = "completeButton"; // Assigns class to do different stylings on the buttons
        completeTask.textContent = "Markera uppgift som klar";
        completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID)); // Calls the markAsCompleteToDo function and sends the ID of the task we want to mark as complete

        const deleteTask = document.createElement("button"); // Creates a button for deleting tasks
        deleteTask.className = "deleteButton"; // Assigns class to do different stylings on the buttons
        deleteTask.textContent = "Ta bort uppgift";
        deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); // Calls on the deleteToDo function and sends the ID of the task we want to delete

        // Adds all the elements in the correct order under the li element we created
        showTask.appendChild(showDescription);
        showTask.appendChild(completeTask);
        showTask.appendChild(deleteTask);
        taskList.appendChild(showTask); // Adds the complete li element to the ul element

    });
}