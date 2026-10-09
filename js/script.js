const tasks = [];


// SELECTIONS
let taskNameInput = document.querySelector("#taskName");
let taskDescInput = document.querySelector("#taskDescription");
let btnAdd = document.querySelector("#addBtn");
let tableBody = document.querySelector("tbody");



// DISPLAY TASK
function displayTasks () {
if (tasks.length > 0){
    tableBody.innerHTML = "";
   tasks.forEach((el , index) => {
    tableBody.innerHTML += `  <tr>
                    <td>${index + 1}</td>
                    <td>${el.taskName}</td>
                    <td>${el.taskDesc}</td>
                    <td>Done</td>
                    <td>
                        <button onclick="deleteTask(${index})">Delete</button>
                        <button onclick="openModal(${index})">Update</button>
                    </td>
                 </tr>`
   });
} else{
    tableBody.innerText = "NO Tasks Yet.. !!"
}
}
displayTasks();




// ADD TASK
function addTask() {
    let newTask = {
        taskName: taskNameInput.value ,
        taskDesc: taskDescInput.value ,
        taskStatus: false
    }
    tasks.push(newTask);
    displayTasks();
}

btnAdd.addEventListener("click" , () => {
    addTask();
})




//DELETE TASK
function deleteTask (selectedIndex) {
    tasks.splice(selectedIndex , 1);
    displayTasks();

}





// //UPDATE TASK
// let modal = document.querySelector(".modal-update");
// let taskNameInputUpdate = document.querySelector(".modal-update #taskName");
// let taskDescInputUpdate = document.querySelector(".modal-update #taskName #taskDescription");

// // OPEN MODAL TO UPDATE TASK
// function openModal () {
// modal.style.display = "flex";
// taskNameInputUpdate.value = tasks[selectedIndex].taskName
// taskDescInputUpdate.value = tasks[selectedIndex].taskDescription
// }

// // CLOSE MODAL 
// function closeModal(selectedIndex) {
//     modal.addEventListener("click", (e) => {
//         // If the user clicks directly on the modal background, close it
//         if (e.target === modal) {
//             modal.style.display = "none";
//         }
//     });
// }
// closeModal();

// function updateTask (selectedIndex) {


// }


// TRACKING INDEX FOR EDITING
let currentEditingIndex = null;

// UPDATE TASK SELECTIONS
let modal = document.querySelector(".modal-update");
let taskNameInputUpdate = document.querySelector("#updateTaskName");
let taskDescInputUpdate = document.querySelector("#updateTaskDescription");
let btnUpdate = document.querySelector("#updateBtn");

// OPEN MODAL TO UPDATE TASK (Pass selectedIndex here)
function openModal(selectedIndex) {
    currentEditingIndex = selectedIndex; // Store which task we are editing
    modal.style.display = "flex";
    
    // Fill modal inputs with current task values
    taskNameInputUpdate.value = tasks[selectedIndex].taskName;
    taskDescInputUpdate.value = tasks[selectedIndex].taskDesc;
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

// COMPLETE UPDATE TASK FUNCTION
function updateTask() {
    if (currentEditingIndex !== null) {
        // Update task properties with new values from modal inputs
        tasks[currentEditingIndex].taskName = taskNameInputUpdate.value;
        tasks[currentEditingIndex].taskDesc = taskDescInputUpdate.value;
        
        // Refresh table display
        displayTasks();
        
        // Hide modal and reset index
        modal.style.display = "none";
        currentEditingIndex = null;
    }
}

// EVENT LISTENER FOR UPDATE BUTTON
btnUpdate.addEventListener("click", () => {
    updateTask();
});

