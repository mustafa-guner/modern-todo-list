
//Selectors

/*Header of the calendar*/
const taskHeader = document.getElementById("taskHeader");

//Description - Date Part
const calendarDescription = document.getElementById("calendar-desc");
const calendarCreatedDate = document.getElementById("calender-date");

/*List Form Elements - Main Page*/
const form = document.querySelector("#addInputs");
const tasklist = document.querySelector("#tasklist");

//Form Inputs & Button
const inputStartTime = document.getElementById("start");
const inputEndTime = document.getElementById("end");
const inputTitle = document.getElementById("titles");
const inputLocation = document.getElementById("location");
const addBtn = document.getElementById("addBtn");

//Auto incrementing id
const count = document.getElementById("count");

//Save Button To Local Storage All Data
const save = document.getElementById("saveToLocalStorageBtn");


let taskManager = () => {
    return new Promise((resolve, reject) => {
        //If user didnt define any title.
        if (taskHeader.textContent === "Untitled") {
            reject("It seems you are new here.You should create new task header before you start!");
        } else {
            resolve(taskHeader.textContent)
        }
    }).then(res => {
        console.log(res)
    }).catch(err => {
        taskHeader.classList.add("disabled-header");
        calendarDescription.classList.add("disabled-header");
        calendarCreatedDate.classList.add("disabled-header");

        disablingAllFormInputs();
        UI.errorBlock("routing_processes", "You have to create task title before you start!");
        //Mop-up for displaying the error
        Swal.fire({
            title: "Welcome!",
            text: err,
            confirmButtonText: "Got it!",
            icon: "warning",
            //Directing to CREATE TITLE Section
        }).then(() => {
            Swal.fire("Redirecting..")
            sideBar.classList.add("bringMenu");
            creatingSection.classList.add("bringCreatingUI")
        })
    })
}


addEventListeners();

function addEventListeners() {
    document.addEventListener("DOMContentLoaded", taskManager,);

    form.addEventListener("submit", addInputs);
    tasklist.addEventListener("click", deleteAnItem);
    // save.addEventListener("click", saveToLocalStorage);
}

//Starting auto increment of ID From 0
let IDcount =  1;

function addInputs(e) {
    //Preventing the submit 
    e.preventDefault();

    //Taking all form values.
    const start = inputStartTime;
    const end = inputEndTime;
    const title = inputTitle;
    const location = inputLocation;

    let id = IDcount++;

    const validation = [start, end, title, location];

    //If inputs are empty
    if (!validation.every((task) => task.value != "")) {

        UI.errorBlock("danger", "Can't Be Empty!");
        IDcount--;

    } else {
        
        //Creating new Task From the Task Object 
        const task = new Task(start.value, end.value, title.value, location.value,id);
       
        UI.addNewTask(task);

        UI.errorBlock("success", "Added Succesfuly.")

        console.log("Submitted");

        //Sending validation values to clear input
        UI.clearInputs(validation);

        //return task;
    }
}


//Deleting a spesific task.
function deleteAnItem(e) {
    let targetElement = e.target;
    if (targetElement.id === "editAnItem") {
        //let arr = new Array(e.target.parentElement.parentElement.textContent);
        targetParent = targetElement.parentElement.parentElement.childNodes;
        UI.editATask(targetParent);
    }


    if (e.target.id === "deleteAnItem") {
        if (confirm("Are You Sure Delete This Task?")) {
            e.target.parentElement.parentElement.remove();
            UI.errorBlock("success", "Deleted Succesfully.")
        } else {
            UI.errorBlock("primary", "DELETE CANCELED")
        }

    }
}



// //Save Functions

// (function saveHelperFunction(tasks){

//     e.preventDefault()
//     addItemsToLocalStorage(tasks)

// },addInputs(e));

// function getItemsFromLocalStorage(){

//     let tasks;

//     if(localStorage.getItem("tasks") === null){
//         tasks = [];
//     } else{
//         tasks = JSON.parse(localStorage.getItem("tasks"))
//     }
//     return tasks;
// }

// function addItemsToLocalStorage(tasksItems){
//     let taskList = getItemsFromLocalStorage();

//     taskList.push(tasksItems)

//     localStorage.setItem("tasks",JSON.stringify(taskList));
// }


// //Local Storage Save Function
// function saveToLocalStorage() {
//     const savedItems = saveHelperFunction();
//     console.log(savedItems)
//     addItemsToLocalStorage(savedItems);

// }

