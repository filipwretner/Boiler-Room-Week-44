document.addEventListener("DOMContentLoaded", () => {
    let toDoList = []; // Array to hold all the tasks

    // Class that acts as a template for creating task objects
    class Task {
        constructor(taskID, taskDescription, isCompleted,) {
            this.taskID = taskID;
            this.taskDescription = taskDescription;
            this.isCompleted = isCompleted;
            
        }
    }

    // Getting the elements from the HTML document and assigning them to variables
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput"); 
    const taskList = document.getElementById("taskList"); 
    const message = document.getElementById("message"); 
    const filterSelect = document.getElementById("filterSelect"); 
    const sortSelect = document.getElementById("sortSelect"); 
    const searchInput = document.getElementById("searchInput"); 

    // Event listener for adding new tasks when the form is submitted
    taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskDescription = taskInput.value.trim();

    // If the input is empty, show an error message and stop further execution
    if (taskDescription === "") {
        message.innerText = "Du måste ange en uppgift.";
        return;
    }

    createNewTask(taskDescription);
    updateTaskElements();
    taskInput.value = "";
    message.innerText = "";
    });

    // Updating task list when we apply any type of filter
    filterSelect.addEventListener("change", updateTaskElements);
    sortSelect.addEventListener("change", updateTaskElements);
    searchInput.addEventListener("input", updateTaskElements);

    // Function to add a new task to the list
    function createNewTask(description, ) {
        const newTask = new Task(Date.now(), description, false, );
        toDoList.push(newTask);
        saveToLocalStorage();
    }

    // Function to display tasks on the webpage
    function updateTaskElements() {
        
        taskList.innerHTML = ""; 

        let filteredTasks = [...toDoList]; // Create a copy of the task list for filtering and sorting

        // Apply search filter
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task => task.taskDescription.toLowerCase().includes(searchTerm));
        }

        // Apply status filter
        const filterValue = filterSelect.value;
        if (filterValue !== "all") {
            filteredTasks = filteredTasks.filter(task => filterValue === "completed" ? task.isCompleted : !task.isCompleted);
        }

        // Apply sorting
        const sortValue = sortSelect.value;
        if (sortValue === "date") {
            filteredTasks.sort((a, b) => a.taskID - b.taskID); // Sort by date - ID = Date
        } else if (sortValue === "status") {
            filteredTasks.sort((a, b) => a.isCompleted - b.isCompleted);
        }

        // Loop through the filtered and sorted tasks and create HTML elements for each
        filteredTasks.forEach(task => {

            // Create a list item (li) element for each task
            const showTask = document.createElement("li");
            showTask.className = task.isCompleted ? "completed" : ""; // Assign the 'completed' class if the task is done, otherwise leave it empty
            showTask.dataset.id = task.taskID;

            // Create a paragraph element for the task description
            const showDescription = document.createElement("p");
            showDescription.textContent = `${task.taskDescription} `;

            // Button to mark the task as completed
            const completeTask = document.createElement("button");
            completeTask.className = "completeButton"; 
            completeTask.textContent = task.isCompleted ? "Ångra" : "Markera uppgift som klar";
            completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID));

            // Button to delete the task
            const deleteTask = document.createElement("button");
            deleteTask.className = "deleteButton";
            deleteTask.textContent = "Ta bort uppgift"; 
            deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); 

            // Button to edit the task
            const editTask = document.createElement("button");
            editTask.className = "editButton";
            editTask.textContent = "Redigera uppgift";
            editTask.addEventListener("click", () => editToDo(task.taskID));

            // Adding the new elements
            showTask.appendChild(showDescription); 
            showTask.appendChild(completeTask); 
            showTask.appendChild(deleteTask); 
            showTask.appendChild(editTask); 

            taskList.appendChild(showTask); 
        });
    }

    function markAsCompleteToDo(taskID) {

        toDoList = toDoList.map(task => {
            if (task.taskID === taskID) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task; // Return the task unchanged if it does not match the given ID
        });
        updateTaskElements();
        saveToLocalStorage();
    }

    function deleteToDo(taskID) {
        toDoList = toDoList.filter(task => task.taskID !== taskID);
        updateTaskElements(); 
        saveToLocalStorage(); 
    }

    
    
    function editToDo(taskID) {

        // Find the list item that contains the task
        const listItem = document.querySelector(`[data-id='${taskID}']`);
        const taskToEdit = toDoList.find(task => task.taskID === taskID);
    
        if (listItem && taskToEdit) {

            // Replace the task description paragraph with an input field
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = taskToEdit.taskDescription;
            inputField.className = "editInput";
    
            // Replace the "Edit" button with a "Save" button
            const saveButton = document.createElement("button");
            saveButton.textContent = "Spara";
            saveButton.className = "saveButton";
    
            // Event listener for saving changes
            saveButton.addEventListener("click", () => {
                const newDescription = inputField.value.trim();
                if (newDescription !== "") {
                    taskToEdit.taskDescription = newDescription;
                    updateTaskElements();
                    saveToLocalStorage(); 
                }
            });
    
            // Remove the old task description and edit button from the list item
            listItem.querySelector("p").remove();
            listItem.querySelector(".editButton").remove();
    
            // Append the input field and save button to the list item
            listItem.appendChild(inputField);
            listItem.appendChild(saveButton);

            // Remove complete task button when editing
            let completeButtonelementslist = listItem.getElementsByClassName("completeButton");
            completeButtonelementslist[0].remove();

        }
    }
    
    // Load tasks from localStorage when the page loads
    const savedTasks = localStorage.getItem("toDoList"); // Get saved tasks from localStorage
    if (savedTasks) {
        toDoList = JSON.parse(savedTasks).map(task => new Task(task.taskID, task.taskDescription, task.isCompleted,)); // Parse the saved tasks and recreate Task objects from the parsed data
        updateTaskElements(); 
    }

    function saveToLocalStorage() {
        localStorage.setItem("toDoList", JSON.stringify(toDoList)); // Save the current state of toDoList to localStorage by converting it to a JSON string
    }

});
