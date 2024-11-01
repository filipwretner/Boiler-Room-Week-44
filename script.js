
// Main menu function for the To-Do application
function mainMenu() {
    let choice; // Variable to store the user's menu choice

    // Loop until the user chooses to exit
    do {
        console.log("\n===============================");
        console.log("Välkommen till To-Do-applikationen!"); // Welcome message
        console.log("Välj ett alternativ:"); // Prompt for user choice
        console.log("1: Lägg till en ny uppgift"); // Option to add a new task
        console.log("2: Visa alla uppgifter"); // Option to show all tasks
        console.log("3: Markera en uppgift som klar"); // Option to mark a task as complete
        console.log("4: Ta bort en uppgift"); // Option to delete a task
        console.log("5: Avsluta programmet"); // Option to exit the program
        console.log("===============================\n");
     
        // Prompt user for their choice
        choice = prompt("Ange ditt val (1-5):");

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
                deleteDo(); // Call function to delete a task
                break;

            case '5':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!"); // Exit message
                break;

            default:
                console.log("Ogiltigt val, försök igen."); // Invalid choice message
        }

    } while(choice !== '5'); // Continue loop until the user chooses to exit
}

   

function addToDo() {

}

function showToDo() {

}

function markAsComplete() {

}

function deleteToDo() {
    
}
mainMenu(); // Making sure the application actually runs