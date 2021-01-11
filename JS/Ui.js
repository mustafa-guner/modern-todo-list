

class UI {
    constructor() {

    }


    //Adding New Task
    static addNewTask(newTask) {
        

        const taskList = document.getElementById("tasklist");

        //Destructuring
        const {id,start,end,title,location} = newTask;

        taskList.innerHTML += `
        
         <tr>
            <th id="count" class="text-danger" scope="row">${id}</th>
            <td><input class="w-100 text-center createdTaskElement" type="time" value="${start}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="time" value="${end}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="text" value="${title}" disabled></td>
            <td><input class="w-100 text-center createdTaskElement" type="text" value="${location}"disabled></td>
            <td><i id="editAnItem" class="fas fa-pen-square text-secondary"></i></td>
            <td><i id="deleteAnItem" class="fas fa-trash text-danger"></i></i></td>
         </tr>
        
        `
        return newTask;
    }

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


    //Edit the specific row elements
    static editATask(targetParent) {
        targetParent.forEach(item => {
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


    //LOCAL STORAGE SAVELEME ISLEMLERI
    // static saveItemsToLocalStorage(saveItems){

    //   console.log(saveItems)

    // }

}

