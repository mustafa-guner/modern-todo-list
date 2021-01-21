


class UI {
    constructor() {}

    //UI FUNCTIONS (ADD - EDIT - DELETE)

    //Adding New Task
    static addNewTask(newTask) {
        const taskList = document.getElementById("tasklist");
        //Destructuring
        const { id, start, end, title, location } = newTask;
        taskList.innerHTML += `
         <tr>
            <th id="count" class="text-danger" scope="row">${id}</th>
            <td><input class="w-100 text-center createdTaskElement" type="time" value="${start}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="time" value="${end}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="text" value="${title}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="text" value="${location}"disabled></td>
            <td><i id="editAnItem" class="fas fa-pen-square text-secondary"></i></td>
            <td><i id="deleteAnItem" class="fas fa-trash text-danger"></i></td>
         </tr>
        `
        return newTask;
    }

    //Edit the specific row elements
    static editATask(targetParent) {
        targetParent.forEach((item,index) => {
            if (item.nodeType === 1) {
                item.childNodes[0].disabled = false;
                item.addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        targetParent.forEach(input => {
                            if (input.nodeType === 1) {
                                input.childNodes[0].disabled = true;
                            }
                        })

                    }

                })
            }
        })
    }


    //Deleting a spesific task.
static deleteAnItem(e) {
    //EDIT
    let targetElement = e.target;
    if (targetElement.id === "editAnItem") {
        //let arr = new Array(e.target.parentElement.parentElement.textContent);
       let targetParent = targetElement.parentElement.parentElement.childNodes;
        this.editATask(targetParent);
    }

    //DELETE
    if (e.target.id === "deleteAnItem") {
        if (confirm("Are You Sure Delete This Task?")) {
            e.target.parentElement.parentElement.remove();
            LocalStorage.deleteSingleDataRow(e.target.parentElement.parentElement.childNodes)
            this.errorBlock("success", "Deleted Succesfully.")
        } else {
           this.errorBlock("primary", "DELETE CANCELED")
        }

    }
}


     //Deletes ALL DATA FROM UI AND LOCAL STORAGE
     static deleteAll(){
        let taskList = document.getElementById("tasklist");
        let specifiedList = LocalStorage.getItemsFromLocalStorage(taskList);
        console.log(taskList.childNodes.length)
        if(tasklist.childNodes.length>=3){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    taskList.childNodes.forEach(task=>{
                        //console.log(task);
                        if(task.nodeType === 1){
                           task.remove();
                        }
                    })
                    let deletedNewArr = specifiedList.slice(1)
                    localStorage.setItem(taskList,JSON.stringify(deletedNewArr))
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
           
        } else{
            UI.error("Can't delete empty list!");
        }
    }

    
    //DELETES ALL DATA FROM ONLY UI (LIST ELEMENTS)
    static deleteAllFromUI(){
        let taskList = document.getElementById("tasklist");
        taskList.childNodes.forEach(task=>{
            //console.log(task);
            if(task.nodeType === 1){
               task.remove();
            }
        })
    }
    
    //Done List Remove
    static deleteAllFromStorageUI(targetStorage){
       targetStorage.remove()
    }



    /*----------------------------------------------------------*/

    //UI FEEDBACK AND ERROR HANDLING MESSAGES

      //Error Blocks
      static errorBlock(type, message, cb) {
        const errors = document.getElementById("errorBlock");
        //If User has not edited or created a new task list 
        if (type === "routing_processes") {
            errors.innerHTML = `<div class = "alert alert-danger">${message}</div>`
            //If there is any thid parameter remove elements in block
            if (cb) {
                errors.innerHTML = "";
            }
        } else {
            //Error Block Content
            errors.innerHTML = `<div class = "alert alert-${type}">${message}</div>`
            //Temperory Error Message
            setTimeout(() => {
                errors.innerHTML = "";
            }, 1000);
        };
    };

    //Success Mokups
    static successful(text) {
        Swal.fire({
            title: "Success!",
            text: text,
            icon: "success"
        })
    }

    //Error MockUps
    static error(text) {
        Swal.fire({
            title: "Error!",
            text: text,
            icon: "error"
        })
    }

    //Clearing Inputs
    static clearInputs(deleted) {
        deleted.forEach(element => {
            element.value = "";
        });
    }


    /*----------------------------------------------------------*/

  

    //LOCAL STORAGE TRANSACTION functions

    //Comes from LOCAL STORAGE.
    static createSavedList(titleOfTask) {
   

    const savedTaskTable = document.querySelector(".savedTaskTable");
            savedTaskTable.innerHTML += `<div class="suggestions">
            <div class="doneTable">
                <h3>${titleOfTask}</h3>
            </div>
            <div class="settings">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>`
    
        //Taking each stroage item
    this.getDataFromDoneTable()
    }


    //Get Saved Datas to UI Back!
    static getDatasBackToUI(title) {
        let tasks = LocalStorage.getItemsFromLocalStorage(title);
        let taskList = document.getElementById("tasklist");

        return new Promise((resolve,reject)=>{
            if(tasks){
                resolve(tasks)
            } else{
                reject("Error Occured Check Saved Task Titles!")
            }
        }).then(tasks=>{
        taskHeader.innerText = title
        tasks.forEach(task => {
            task.forEach(element=>{
               
                taskList.innerHTML += `
                
            <tr>
                <th id="count" class="text-danger" scope="row"></th>
                <td><input class="w-100 text-center createdTaskElement" type="time" value="${element[0]}" disabled></td>
                <td><input class="w-100 text-center createdTaskElement" type="time" value="${element[1]}" disabled></td>
                <td><input class="w-100 text-center createdTaskElement" type="text" value="${element[2]}" disabled></td>
                <td><input class="w-100 text-center createdTaskElement" type="text" value="${element[3]}"disabled></td>
                <td><i id="editAnItem" class="fas fa-pen-square text-secondary"></i></td>
                <td><i id="deleteAnItem" class="fas fa-trash text-danger"></i></td>
             </tr>
                `
            });
        });
        }).then(
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Loading..',
                showConfirmButton: false,
                timer: 1200
              }).then(() => {
            sideBar.classList.remove("bringMenu");
        }))
       
        
    }

    //Loading all saved task arrays in saved lists when the document loaded
    static loadAllSavedItems() {

        const savedTaskTable = document.querySelector(".savedTaskTable");
        let loads = [];
        for (let i = 0; i < localStorage.length; i++) {
            loads.push(localStorage.key(i));
        }

        loads.forEach(load => {
            savedTaskTable.innerHTML += `<div class="suggestions">
                                            <div class="doneTable">
                                                <h3>${load}</h3>
                                            </div>
                                            <div class="settings">
                                                <i class="fas fa-trash-alt"></i>
                                            </div>
                                        </div>`
        });

       
        this.getDataFromDoneTable();

        //Loading the latest data when reload
        let lastElement = loads[0];

      return lastElement
       
    }

    static getLastAddedStorageList(){
        let loads = [];
        for (let i = 0; i < localStorage.length; i++) {
            loads.push(localStorage.key(i));
        }
        return loads[loads.length-1];
    }



     //Taking each stroage item
    static getDataFromDoneTable(){
        const settings = document.querySelectorAll(".settings");
        const doneTables = document.querySelectorAll(".doneTable");
        //DoneTable UI
        doneTables.forEach(doneTable=>{
            doneTable.addEventListener("click",()=>{
                this.getDatasBackToUI(doneTable.innerText);
                this.deleteAllFromUI()
                //Removing the limitations
        taskHeader.classList.remove("disabled-header"); ///->Removes disabled header style.
        UI.errorBlock("routing_processes", "message", "remove"); //->Removes the Warning Message.
        EnablingAllFormInputs();//-> Enables the access on form elements.
       
            })
        })
        
        //Settings UI
      settings.forEach(setting=>{
            setting.addEventListener("click",(e)=>{
               if(e.target.className === "fas fa-trash-alt"){
                let removeTarget = e.target.parentElement.parentElement.firstChild.nextSibling.innerText;

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {

                        localStorage.removeItem(removeTarget);
                        this.deleteAllFromStorageUI(e.target.parentElement.parentElement);
                        this.deleteAllFromUI()
                        taskHeader.classList.add("disabled-header");
                        taskHeader.innerText = "untitled"
                        disablingAllFormInputs();
                        UI.errorBlock("routing_processes", "You have to create task title before you start!");
                        save.disabled = true;
                        deleteALL.disabled = true;
                        swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                      )
                    }
                  }) 
               } 
            })
        })

    }


}

