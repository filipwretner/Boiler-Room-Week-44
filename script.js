document.addEventListener("DOMContentLoaded", () => {
    let toDoList = []; // Array to hold all the tasks

    // Class that acts as a template for creating task objects
    class Task {
        constructor(taskID, taskDescription, isCompleted, category) {
            this.taskID = taskID; // Unique identifier for each task, generated using Date.now() for uniqueness
            this.taskDescription = taskDescription; // Description of the task provided by the user
            this.isCompleted = isCompleted; // Status of the task: true if completed, false if not completed
            this.category = category; // Category of the task provided by the user
        }
    }

    // Getting the elements from the HTML document and assigning them to variables
    const taskForm = document.getElementById("taskForm"); // Reference to the form element where tasks are added
    const taskInput = document.getElementById("taskInput"); // Reference to the input field where users type their tasks
    const taskList = document.getElementById("taskList"); // Reference to the unordered list (ul) where tasks will be displayed
    const message = document.getElementById("message"); // Reference to the paragraph element used to display error messages
    const filterSelect = document.getElementById("filterSelect"); // Dropdown for filtering tasks (e.g., show completed or not completed tasks)
    const sortSelect = document.getElementById("sortSelect"); // Dropdown for sorting tasks (e.g., by date or status)
    const searchInput = document.getElementById("searchInput"); // Input field for searching tasks by keyword

    // Event listener for adding new tasks when the form is submitted
    taskForm.onsubmit = function() {
        const taskDescription = taskInput.value.trim(); // Get the input value and remove whitespace from both ends
        const category = document.getElementById("categoryInput").value.trim(); // Get the category value from the input field

        // If the input is empty, show an error message and stop further execution
        if (taskDescription === "") {
            message.innerText = "Du måste ange en uppgift."; // Show error message if input is empty
            return false; // Prevent default form submission (i.e., prevent the page from reloading)
        }

        createNewTask(taskDescription, category); // Add new task to the list by calling the createNewTask function
        showTask(); // Update the task list on the webpage by calling the showTask function
        taskInput.value = ""; // Clear the input field after adding the task
        document.getElementById("categoryInput").value = ""; // Clear the category field after adding the task

        return false; // Prevent default form submission (i.e., prevent the page from reloading)
    };

    // Event listener for filtering tasks when the filter dropdown changes
    filterSelect.addEventListener("change", showTask); // Update the task list when the filter selection changes

    // Event listener for sorting tasks when the sort dropdown changes
    sortSelect.addEventListener("change", showTask); // Update the task list when the sort selection changes

    // Event listener for searching tasks as the user types in the search input
    searchInput.addEventListener("input", showTask); // Update the task list in real-time as the user types in the search box

    // Function to add a new task to the list
    function createNewTask(description, category) {
        const newTask = new Task(Date.now(), description, false, category); // Create a new Task object with a unique ID, description, incomplete status, and category
        toDoList.push(newTask); // Add the new task to the toDoList array
        saveToLocalStorage(); // Save the updated task list to localStorage to ensure persistence across page reloads
    }

    // Function to display tasks on the webpage
    function showTask() {
        message.innerText = ""; // Clear any existing error message
        taskList.innerHTML = ""; // Clear the task list before re-rendering to avoid duplicates

        let filteredTasks = [...toDoList]; // Create a copy of the task list for filtering and sorting

        // Apply search filter
        const searchTerm = searchInput.value.trim().toLowerCase(); // Get the search term and convert it to lowercase for case-insensitive comparison
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task => task.taskDescription.toLowerCase().includes(searchTerm)); // Filter tasks that include the search term in their description
        }

        // Apply category filter
        const filterValue = filterSelect.value; // Get the selected filter value from the dropdown
        if (filterValue !== "all") {
            filteredTasks = filteredTasks.filter(task => filterValue === "completed" ? task.isCompleted : !task.isCompleted); // Filter tasks based on their completion status
        }

        // Apply sorting
        const sortValue = sortSelect.value; // Get the selected sort value from the dropdown
        if (sortValue === "date") {
            filteredTasks.sort((a, b) => a.taskID - b.taskID); // Sort tasks by their creation date in ascending order
        } else if (sortValue === "status") {
            filteredTasks.sort((a, b) => a.isCompleted - b.isCompleted); // Sort tasks by their completion status, with incomplete tasks first
        }

        // Loop through the filtered and sorted tasks and create HTML elements for each
        filteredTasks.forEach(task => {
            const showTask = document.createElement("li"); // Create a list item (li) element for each task
            showTask.className = task.isCompleted ? "completed" : ""; // Assign the 'completed' class if the task is done, otherwise leave it empty
            showTask.dataset.id = task.taskID; // Set the task ID to the element's dataset to identify the task

            const showDescription = document.createElement("p"); // Create a paragraph element for the task description
            showDescription.textContent = `${task.taskDescription} (${task.category})`; // Set the text content to the task description and category

            // Button to mark the task as completed
            const completeTask = document.createElement("button");
            completeTask.className = "completeButton"; // Assign a class to the button for styling purposes
            completeTask.textContent = task.isCompleted ? "Ångra" : "Markera uppgift som klar"; // Toggle button text based on whether the task is completed
            completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID)); // Event listener for marking the task as complete or incomplete

            // Button to delete the task
            const deleteTask = document.createElement("button");
            deleteTask.className = "deleteButton"; // Assign a class to the button for styling purposes
            deleteTask.textContent = "Ta bort uppgift"; // Set button text to indicate deletion
            deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); // Event listener for deleting the task

            // Button to edit the task
            const editTask = document.createElement("button");
            editTask.className = "editButton"; // Assign a class to the button for styling purposes
            editTask.textContent = "Redigera uppgift"; // Set button text to indicate editing
            editTask.addEventListener("click", () => editToDo(task.taskID)); // Event listener for editing the task description

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
            return task; // Return the task unchanged if it does not match the given ID
        });
        showTask(); // Update the task list on the webpage to reflect the changes
        saveToLocalStorage(); // Save the updated task list to localStorage
    }

    // Function to delete a task
    function deleteToDo(taskID) {
        toDoList = toDoList.filter(task => task.taskID !== taskID); // Remove the task with the matching ID from the array
        showTask(); // Update the task list on the webpage to reflect the changes
        saveToLocalStorage(); // Save the updated task list to localStorage
    }

    // Function to edit a task
    function editToDo(taskID) {
        const taskToEdit = toDoList.find(task => task.taskID === taskID); // Find the task to be edited using its ID
        if (taskToEdit) {
            const newDescription = prompt("Redigera uppgiften:", taskToEdit.taskDescription); // Prompt the user to enter a new description
            if (newDescription !== null && newDescription.trim() !== "") { // Check if the new description is valid (not empty or cancelled)
                taskToEdit.taskDescription = newDescription.trim(); // Update the task description with the new value
                showTask(); // Update the task list on the webpage to reflect the changes
                saveToLocalStorage(); // Save the updated task list to localStorage
            }
        }
    }

    // Load tasks from localStorage when the page loads
    const savedTasks = localStorage.getItem("toDoList"); // Get saved tasks from localStorage
    if (savedTasks) {
        toDoList = JSON.parse(savedTasks).map(task => new Task(task.taskID, task.taskDescription, task.isCompleted, task.category)); // Parse the saved tasks and recreate Task objects from the parsed data
        showTask(); // Display the tasks on the webpage
    }

    // Function to save tasks to localStorage
    function saveToLocalStorage() {
        localStorage.setItem("toDoList", JSON.stringify(toDoList)); // Save the current state of toDoList to localStorage by converting it to a JSON string
    }
});
