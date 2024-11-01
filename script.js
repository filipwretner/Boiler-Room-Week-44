function (mainMenu) {

}

function (addToDo) {

}

function (showToDo) {

}

function (markAsComplete) {

}

function removeItem(deleteToDo) {
    if (deleteToDo > 1 || deleteToDo > todoList.lenght) {
        console.log("Invalid item to remove, please enter an item that exists");
        return;
        
    } else {
        let removedItem = todoList.splice(deleteToDo - 1, 1);
        console.log(`Removed: "${removedItem[0]}"`);
        showToDo();
        
        
    }
}