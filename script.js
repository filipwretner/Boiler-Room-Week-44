

//mainmemy
function mainMenu() {

    let choice;

    do{
        console.log("\n===============================");
        console.log("Välkommen till To-Do-applikationen!");
        console.log("Välj ett alternativ:");
        console.log("1: Lägg till en ny uppgift");
        console.log("2: Visa alla uppgifter");
        console.log("3: Markera en uppgift som klar");
        console.log("4: Ta bort en uppgift");
        console.log("5: Avsluta programmet");
        console.log("===============================\n");
     
        choice = prompt("Ange ditt val (1-5):");

        switch(choice){

            case '1':
                addToDo();
                break;

            case '2':
                showToDo();
                break;

            case '3':
                markAsCompleteToDo();
                break;

            case '4':
                deleteDo();
                break;

            case '5':
                console.log("Tack för att du använde To-Do-applikationen! Hej då!");
                break;

            default:
                console.log("Ogiltigt val, försök igen.");
               
        }

    }while(choice !== `5`);

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