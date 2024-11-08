let toDoList = [];

// Class that acts as a template for creating objects
class task {

    constructor(taskID, taskDescription, isCompleted) {
        this.taskID = taskID;
        this.taskDescription = taskDescription;
        this.isCompleted = isCompleted;
    }

}

// Main menu function for the To-Do application
function mainMenu() {

    let choice; // Variable to store the user's menu choice

    // Loop until the user chooses to exit
    do {
     
        // Prompt user for their choice and shows the menu in a prompt
        choice = prompt("Välkommen till To-Do applikationen!\n Välj ett alternativ genom att skriva in rätt nummer mellan 1-6:\n 1: Lägg till en ny uppgift\n 2: Visa uppgifter\n 3: Markera en uppgift som klar\n 4: Ta bort en uppgift\n 5: Sök efter uppgifter\n 6: Avsluta applikationen");

        // Switch statement to handle user input
        switch(choice) {
            case '1':
                addToDo(); // Call function to add a new task
                break;

            case '2':
                showToDo(); // Call function to display all tasks
                break;

            case '3':
                markAsCompleteToDo(); // Call function to mark a task as complete
                break;

            case '4':
                deleteToDo(); // Call function to delete a task
                break;

            case '5':
                searchToDo(); // Call function to search for a task
                break;

            case '6':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!"); // Exit message
                alert("Tack för att du använde To-Do-applikationen! Hej då!");
                break;

            default:
                console.log("Ogiltigt val,de giltiga alternativen är numren 1-6."); // Invalid choice message
        }

    } while(choice !== '6'); // Continue loop until the user chooses to exit by putting in 5
}

// Function to add a new item in the list
function addToDo() {

    console.log(`Du valde 1. i menyn för att skapa en ny uppgift`);

    // Generate a unique ID
    let newID;
    do {
        newID = parseInt(Math.random() * 100); // Automatically creates an ID between 1 and 100
    } while (toDoList.some(task => task.taskID === newID)); // Check if ID is in use


    //Create and return new task
    let newTask = new task(newID, prompt(`Ange beskrivning av uppgiften:`), "Ej Klar");

    console.log(newTask);
    toDoList.push(newTask); // Inserts the task in the list
}

// Function to show items in the list
function showToDo() {

    console.log(`Du valde 2. i menyn för att visa lagrade uppgifter`);

    let showList;

    if (toDoList.length === 0) { // Checks if there is any items in the list

        console.log(`Just nu finns det inga uppgifter att visa`);
        alert(`Just nu finns det inga uppgifter att visa`);

    } else { // Prints out the entire list or filters by status

        let filter = prompt(`Filtrera uppgifter efter: 'klar' eller 'ej klar', lämna fältet tomt om du vill visa alla uppgifter.`).toLowerCase(); // Asks the user to enter a filter
        let filteredList = toDoList.filter(task => filter === "klar" ? task.isCompleted === "Klar" : filter === "ej klar" ? task.isCompleted === "Ej Klar" : toDoList); // Adds the filtered list to a new array


        console.log(`Uppgifter:`);
        filteredList.forEach(task => console.log(`Visa ID: ${task.taskID} Visa beskrivning: ${task.taskDescription} Visa status: ${task.isCompleted} `)); // Prints out the filtered list, if no filter was chosen the entire toDoList becomes the filteredList
        alert(`Uppgifter visas i konsolen.`);

    }

}

// Function to mark an item as complete
function markAsCompleteToDo() {

    console.log(`Du valde 3. i menyn för att markera uppgifter som klara`);

    let id = parseInt(prompt('Ange ID för uppgiften du vill markera som klar:')); // Asks the user to put in the ID of the task they want to mark as complete

    if (isNaN(id)) { // Error message if the user doesnt put in a number
        console.log(`Ett ID är ett heltal mellan 1 och 100. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
        alert(`Ett ID är ett heltal mellan 1 och 100. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
    }

    let taskFound = false; // Initiates a control-variable as false

    for (let i = 0; i < toDoList.length; i++) { // Loop through the array to check if it contains an ID that corresponds with the user input

        if (toDoList[i].taskID === id) { // Checks the object att every index for a matching ID
            
            console.log(`Uppgiften med ID: ${toDoList[i].taskID} har markerats som klar.`);
            alert(`Uppgiften med ID: ${toDoList[i].taskID} har markerats som klar.`);
            toDoList[i].isCompleted = "Klar"; // Changes the status from 'Not done' to 'Done'
            taskFound = true; // Changes the control variable to true once we find a matching ID
            break;

        } 
    }

    if (!taskFound) { // If the loop doesnt find a matching ID the control variable never changes
        alert(`Ingen uppgift med ID ${id} hittades. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
    }

}

// Function to delete an item from the list
function deleteToDo() {

    console.log(`Du valde 4. i menyn för att ta bort uppgifter från listan`); 

    let id = parseInt(prompt("Skriv in ID på den uppgift du vill ta bort:")); // Asks the user to put in the ID of the task they want to mark as delete

    if (isNaN(id)) { // Error message if the user doesnt put in a number
        console.log(`Ett ID är ett heltal mellan 1 och 100. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
        alert(`Ett ID är ett heltal mellan 1 och 100. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
    }

    // Below is the same principle as the function markAsCompleteToDo
    let taskFound = false;

    for (let i = 0; i < toDoList.length; i++) {

        if (toDoList[i].taskID === id) {
            
            alert(`Uppgiften med ID ${toDoList[i].taskID} har tagits bort.`);
            toDoList.splice(i, 1); // Splices one item at the index where the loop found a matching ID
            taskFound = true;
            break;

        } 
    }

    if (!taskFound) {
        alert(`Ingen uppgift med ID ${id} hittades. För att se ID på en uppgift kan du visa uppgift alla uppgifter genom att mata in '2' i huvudmenyn eller sök efter specifika uppgifter  genom att mata in '5'.`);
    }

}

// Function to search for an item in the list
function searchToDo() {

    console.log(`Du valde 5. i menyn för att söka efter uppgifter i listan`);

    let keyword = prompt("Ange ett sökord för att hitta en uppgift i listan:"); // Asks the user to put in a string that will be used to filter through the array with
    let foundTasks = toDoList.filter(task => task.taskDescription.includes(keyword)); // Initiates a new array with all the items in the toDoList that has the keyword in the description

    if (foundTasks.length > 0) { // Checks if we found any items that matched the keyword to add to the new array

        console.log(`Sökresultat:`);
        foundTasks.forEach(task => console.log(`ID: ${task.taskID} Beskrivning: ${task.taskDescription} Status: ${task.isCompleted}`));
        alert(`Sökresultat visas i konsolen`);

    } else { // Message if we didn't find any items
        console.log(`Inga uppgifter matchade sökordet, vill du se alla uppgifter kan du mata in '2 i huvudmenyn.'`);
        alert(`Inga uppgifter matchade sökordet, vill du se alla uppgifter kan du mata in '2 i huvudmenyn.`);
    }

}

mainMenu(); // Making sure the application actually runs