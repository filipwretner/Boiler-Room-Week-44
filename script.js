// To-Doリストのタスクを格納する配列
let toDoList = [];

// 各要素を取得し、変数に代入
const taskForm = document.getElementById("taskForm"); // フォーム要素
const taskInput = document.getElementById("taskInput"); // タスク入力フィールド
const taskList = document.getElementById("taskList"); // タスク一覧のul要素
const message = document.getElementById("message"); // エラーメッセージ用のp要素

// タスクを表示する関数
function showToDo() {
    message.innerText = ""; // エラーメッセージをクリア
    taskList.innerHTML = ""; // 画面のタスクリストをクリア

    // toDoListにある各タスクをループして表示
    toDoList.forEach(task => { 
        const showTask = document.createElement("li"); // li要素を作成
        showTask.className = task.isCompleted ? "completed" : ""; // タスクが完了していれば"completed"クラスを付与
        showTask.dataset.id = task.taskID; // タスクのIDをdata-id属性に設定

        const showDescription = document.createElement("p"); // タスク内容表示用のp要素
        showDescription.textContent = task.taskDescription;

        const completeTask = document.createElement("button"); // 完了ボタンを作成
        completeTask.className = "completeButton";
        completeTask.textContent = "Markera uppgift som klar"; // ボタンに「タスクを完了」と表示
        completeTask.addEventListener("click", () => markAsCompleteToDo(task.taskID)); // ボタンがクリックされたらmarkAsCompleteToDo関数を呼び出し

        const deleteTask = document.createElement("button"); // 削除ボタンを作成
        deleteTask.className = "deleteButton";
        deleteTask.textContent = "Ta bort uppgift"; // ボタンに「タスクを削除」と表示
        deleteTask.addEventListener("click", () => deleteToDo(task.taskID)); // ボタンがクリックされたらdeleteToDo関数を呼び出し

        // li要素に各要素を順番に追加
        showTask.appendChild(showDescription);
        showTask.appendChild(completeTask);
        showTask.appendChild(deleteTask);
        taskList.appendChild(showTask); // ul要素にli要素を追加
    });
}

// フォーム入力から新しいタスクを追加する関数
taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); // ページリロードを防止

    const taskDescription = taskInput.value.trim(); // 入力フィールドの値を取得して前後の空白を削除

    // 入力が空白の場合のバリデーション
    if (taskDescription === "") {
        message.innerText = "Uppgiften kan inte vara tom."; // エラーメッセージを表示
        return;
    }

    // 新しいタスクを作成し、toDoListに追加
    const newTask = {
        taskID: Date.now(), // 各タスクにユニークなIDを付与
        taskDescription: taskDescription,
        isCompleted: false
    };

    toDoList.push(newTask); // 新しいタスクをリストに追加
    taskInput.value = ""; // 入力フィールドをクリア
    saveToLocalStorage(); // localStorageに保存
    showToDo(); // 画面にタスクリストを再表示
});

// タスクを完了としてマークする関数
function markAsCompleteToDo(taskID) {
    toDoList = toDoList.map(task =>
        task.taskID === taskID ? { ...task, isCompleted: !task.isCompleted } : task
    );
    saveToLocalStorage(); // localStorageに保存
    showToDo(); // 画面にタスクリストを再表示
}

// タスクを削除する関数
function deleteToDo(taskID) {
    toDoList = toDoList.filter(task => task.taskID !== taskID); // 指定したID以外のタスクだけを残す
    saveToLocalStorage(); // localStorageに保存
    showToDo(); // 画面にタスクリストを再表示
}

// タスクリストをlocalStorageに保存する関数
function saveToLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// ページ読み込み時にlocalStorageからタスクリストを読み込む
document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = localStorage.getItem("toDoList");
    if (savedTasks) {
        toDoList = JSON.parse(savedTasks); // 保存されたタスクリストを読み込む
        showToDo(); // 読み込んだタスクリストを表示
    }
});