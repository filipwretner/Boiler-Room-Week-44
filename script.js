function (mainMenu) {

}

function (addToDo) {

}

function (showToDo) {
    if (todolist.length === 0) {
        console.log(`Just nu finns det inga uppgifter att visa`);
        alert(`Just nu finns det inga uppgifter att visa`);
    } else {
        console.log(`Alla uppgifter:`);
        alert(`Alla uppgifter:`);
        todolist.forEach(todo => console.log(`Visa ID: Visa beskrivning: Visa status:`));
        todolist.forEach(todo => alert(`Visa ID: Visa beskrivning: Visa status:`));
    }
}

function (markAsComplete) {

}

function (deleteToDo) {
    
}