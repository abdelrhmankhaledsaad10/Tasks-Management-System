const tasks = [];


// SELECTIONS
let taskNameInput = document.querySelector("#taskName");
let taskDescInput = document.querySelector("#taskDescription");
let btnAdd = document.querySelector("#addBtn");
let tableBody = document.querySelector("tbody");



// DISPLAY TASK (Dynamic Status)
function displayTasks() {
    if (tasks.length > 0) {
        tableBody.innerHTML = "";
        tasks.forEach((el, index) => {
            tableBody.innerHTML += `<tr>
                <td>${index + 1}</td>
                <td>${el.taskName}</td>
                <td>${el.taskDesc}</td>
                <td>${el.taskStatus ? "Done" : "Not Done"}</td>
                <td>
                    <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
                    <button class="btn-update" onclick="openModal(${index})">Update</button>
                </td>
             </tr>`;
        });
    } else {
        tableBody.innerText = "NO Tasks Yet.. !!";
    }
}



// ADD TASK
function addTask() {
    let newTask = {
        taskName: taskNameInput.value,
        taskDesc: taskDescInput.value,
        taskStatus: false
    }
    tasks.push(newTask);
    displayTasks();
}
btnAdd.addEventListener("click", () => {
    addTask();
})




//DELETE TASK
function deleteTask(selectedIndex) {
    tasks.splice(selectedIndex, 1);
    displayTasks();

}


// UPDATE TASK SELECTIONS (Added status input)
let currentEditingIndex = null;
let modal = document.querySelector(".modal-update");
let taskNameInputUpdate = document.querySelector("#updateTaskName");
let taskDescInputUpdate = document.querySelector("#updateTaskDescription");
let taskStatusInputUpdate = document.querySelector("#updateTaskStatus");
let btnUpdate = document.querySelector("#updateBtn");

// OPEN MODAL TO UPDATE TASK
function openModal(selectedIndex) {
    currentEditingIndex = selectedIndex;
    modal.style.display = "flex";

    // Fill modal inputs with current task values including status
    taskNameInputUpdate.value = tasks[selectedIndex].taskName;
    taskDescInputUpdate.value = tasks[selectedIndex].taskDesc;
    taskStatusInputUpdate.value = tasks[selectedIndex].taskStatus.toString();
}

// CLOSE MODAL ON OUTSIDE CLICK
function closeModal() {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}
closeModal();

// COMPLETE UPDATE TASK FUNCTION (Saves new status)
function updateTask() {
    if (currentEditingIndex !== null) {
        tasks[currentEditingIndex].taskName = taskNameInputUpdate.value;
        tasks[currentEditingIndex].taskDesc = taskDescInputUpdate.value;
        tasks[currentEditingIndex].taskStatus = taskStatusInputUpdate.value === "true";

        displayTasks();

        modal.style.display = "none";
        currentEditingIndex = null;
    }
}

// EVENT LISTENER FOR UPDATE BUTTON
btnUpdate.addEventListener("click", () => {
    updateTask();
});

