document.addEventListener("DOMContentLoaded", () => {
    let toDoList = []; // Array to hold all the tasks

    // Class that acts as a template for creating task objects
    class Task {
        constructor(taskID, taskDescription, isCompleted, category) {
            this.taskID = taskID;
            this.taskDescription = taskDescription;
            this.isCompleted = isCompleted;
            this.category = category;
        }
    }

    // Getting the elements and assign them to variables
    const taskForm = document.getElementById("taskForm"); // Reference to the form element
    const taskInput = document.getElementById("taskInput"); // Reference to the input field where users type their tasks
    const taskList = document.getElementById("taskList"); // Reference to the unordered list (ul) where tasks will be displayed
    const message = document.getElementById("message"); // Reference to the paragraph element used to display error messages
    const filterSelect = document.getElementById("filterSelect"); // Dropdown for filtering tasks
    const sortSelect = document.getElementById("sortSelect"); // Dropdown for sorting tasks
    const searchInput = document.getElementById("searchInput"); // Input field for searching tasks

    // Event listener for adding new tasks
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page from reloading when submitting the form

        const taskDescription = taskInput.value.trim(); // Get input value and trim spaces to avoid blank entries
        const category = document.getElementById("categoryInput").value.trim(); // Get the category from input field

        // If the input is empty, show an error message and stop further execution
        if (taskDescription === "") {
            message.innerText = "Du måste ange en uppgift."; // Show error message if input is empty
            return;
        }

        addToDo(taskDescription, category); // Add new task to the list
        showToDo(); // Update the list on the webpage
        taskInput.value = ""; // Clear the input field after adding the task
        document.getElementById("categoryInput").value = ""; // Clear the category field after adding the task
    });

    // Event listener for filtering tasks
    filterSelect.addEventListener("change", showToDo);

    // Event listener for sorting tasks
    sortSelect.addEventListener("change", showToDo);

    // Event listener for searching tasks
    searchInput.addEventListener("input", showToDo);

    // Function to add a new task to the list
    function addToDo(description, category) {
        const newTask = new Task(Date.now(), description, false, category); // Create a new Task object with a unique ID
        toDoList.push(newTask); // Add the new task to the toDoList array
        saveToLocalStorage(); // Save tasks to localStorage
    }

    // Function to display tasks on the webpage
    function showToDo() {
        message.innerText = ""; // Clear any existing error message
        taskList.innerHTML = ""; // Clear the task list before re-rendering to avoid duplicates

        let filteredTasks = [...toDoList];

        // Apply search filter
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task => task.taskDescription.toLowerCase().includes(searchTerm));
        }

        // Apply category filter
        const filterValue = filterSelect.value;
        if (filterValue !== "all") {
            filteredTasks = filteredTasks.filter(task => filterValue === "completed" ? task.isCompleted : !task.isCompleted);
        }

        // Apply sorting
        const sortValue = sortSelect.value;
        if (sortValue === "date") {
            filteredTasks.sort((a, b) => a.taskID - b.taskID);
        } else if (sortValue === "status") {
            filteredTasks.sort((a, b) => a.isCompleted - b.isCompleted);
        }

        filteredTasks.forEach(task => {
            const showTask = document.createElement("li"); // Create list item element for each task
            showTask.className = task.isCompleted ? "completed" : ""; // Assign 'completed' class if the task is done
            showTask.dataset.id = task.taskID; // Set task ID to the element's dataset to identify the task

            const showDescription = document.createElement("p"); // Create paragraph for task description
            showDescription.textContent = `${task.taskDescription} (${task.category})`; // Set the text content of the paragraph to the task description and category

            // Button to mark the task as completed
            const completeTask = document.createElement("button");
            completeTask.className = "completeButton"; // Assign class to the button for styling purposes
            completeTask.textContent = task.isCompleted ? "Ångra" : "Markera uppgift som klar"; // Toggle button text based on task completion status
            completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID)); // Event listener for marking the task as complete or incomplete

            // Button to delete the task
            const deleteTask = document.createElement("button");
            deleteTask.className = "deleteButton"; // Assign class to the button for styling purposes
            deleteTask.textContent = "Ta bort uppgift"; // Set button text to indicate deletion
            deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); // Event listener for deleting the task

            // Button to edit the task
            const editTask = document.createElement("button");
            editTask.className = "editButton";
            editTask.textContent = "Redigera uppgift";
            editTask.addEventListener("click", () => editToDo(task.taskID)); // Event listener for editing the task

            // Append description, complete, delete, and edit buttons to the list item
            showTask.appendChild(showDescription); // Add the task description to the list item
            showTask.appendChild(completeTask); // Add the complete button to the list item
            showTask.appendChild(deleteTask); // Add the delete button to the list item
            showTask.appendChild(editTask); // Add the edit button to the list item

            // Append the list item to the task list (ul)
            taskList.appendChild(showTask); // Add the complete list item to the unordered list
        });
    }

    // Function to mark a task as completed or incomplete
    function markAsCompleteToDo(taskID) {
        toDoList = toDoList.map(task => {
            if (task.taskID === taskID) {
                return { ...task, isCompleted: !task.isCompleted }; // Toggle the isCompleted status of the task
            }
            return task; // Return the task as is if it does not match the given ID
        });
        showToDo(); // Update the list on the webpage to reflect the changes
        saveToLocalStorage(); // Save tasks to localStorage
    }

    // Function to delete a task
    function deleteToDo(taskID) {
        toDoList = toDoList.filter(task => task.taskID !== taskID); // Remove the task with the matching ID from the array
        showToDo(); // Update the list on the webpage to reflect the changes
        saveToLocalStorage(); // Save tasks to localStorage
    }

    // Function to edit a task
    function editToDo(taskID) {
        const taskToEdit = toDoList.find(task => task.taskID === taskID);
        if (taskToEdit) {
            const newDescription = prompt("Redigera uppgiften:", taskToEdit.taskDescription);
            if (newDescription !== null && newDescription.trim() !== "") {
                taskToEdit.taskDescription = newDescription.trim();
                showToDo();
                saveToLocalStorage();
            }
        }
    }

    // Load tasks from localStorage when the page loads
    const savedTasks = localStorage.getItem("toDoList"); // Get saved tasks from localStorage
    if (savedTasks) {
        toDoList = JSON.parse(savedTasks).map(task => new Task(task.taskID, task.taskDescription, task.isCompleted, task.category)); // Parse the saved tasks and recreate Task objects
        showToDo(); // Display the tasks on the webpage
    }

    // Function to save tasks to localStorage
    function saveToLocalStorage() {
        localStorage.setItem("toDoList", JSON.stringify(toDoList)); // Save the current state of toDoList to localStorage
    }
});
