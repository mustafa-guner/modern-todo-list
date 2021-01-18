
//Selectors

/*Header of the calendar*/
const taskHeader = document.getElementById("taskHeader");

//Description - Date Part
//const calendarDescription = document.getElementById("calendar-desc");
//const calendarCreatedDate = document.getElementById("calender-date");

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

//Delete All Btn
const deleteALL = document.getElementById("deleteAll")



let taskManager = () => {
    //Brings the latest element of list

    return new Promise((resolve, reject) => {
        //If user didnt define any title or content
        if (!UI.getLastAddedStorageList()) {
            reject("It seems you are new here.You should create new task header before you start!");
        } else {
            //If he has ,bring the data of key!
            resolve(UI.loadAllSavedItems())
        }
    }).then(res => {
        console.log(res);
        UI.getDatasBackToUI(res);
    }).catch(err => {
        taskHeader.classList.add("disabled-header");
        // calendarDescription.classList.add("disabled-header");
        //calendarCreatedDate.classList.add("disabled-header");

        disablingAllFormInputs();
        UI.errorBlock("routing_processes", "You have to create task title before you start!");
        //Mop-up for displaying the error
        Swal.fire({
            icon: 'warning',
            title: 'Welcome!',
            text:err,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }).then(() => {
            Swal.fire({
                position: 'center-center',
                title: 'Redirecting..',
                showConfirmButton: false,
                timer: 1100
              })
            sideBar.classList.add("bringMenu");
            creatingSection.classList.add("bringCreatingUI");
        })
    })
}


addEventListeners();

function addEventListeners() {

    //Loading saved items to saved lists section when the document reloaded.
    document.addEventListener("DOMContentLoaded", taskManager);

    form.addEventListener("submit", addInputs);

    tasklist.addEventListener("click",e=>{
        UI.deleteAnItem(e)
    });

    //SAVING DATAS TO LOCAL STORAGE.
    save.addEventListener("click", ()=>{
        LocalStorage.saveToLocalStorage()
    });

    //Delete ALL
    deleteALL.addEventListener("click",()=>{
       LocalStorage.deleteFromTableList(taskHeader.innerText)
    })
}

//Starting auto increment of ID From 0
let IDcount = 1;

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
        const task = new Task(start.value, end.value, title.value, location.value, id);

        UI.addNewTask(task);

        UI.errorBlock("success", "Added Succesfuly.")

        console.log("Submitted");

        //Sending validation values to clear input
        UI.clearInputs(validation);
    }
}








