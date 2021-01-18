
const createTaskHeaderForm = document.getElementById("createTaskHeader");
const calendarCreatedDate = document.getElementById("calender-date");


 //Setting the Current Date
 let today = new Date();
 let dd = String(today.getDate()).padStart(2, '0');
 let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 let yyyy = today.getFullYear();
 today = mm + '/' + dd + '/' + yyyy;
 //Setting the created Date.
 calendarCreatedDate.innerText = today;


createTaskHeaderForm.addEventListener("submit", (e) => {
    const CreateTitle = document.getElementById("CreateTitle");
    const description = document.getElementById("descrpt-project");
    // let infos = [CreateTitle.value, description.value];
    let infos = CreateTitle.value;

    return new Promise((resolve)=>{
        // if (infos.every(element => element !== "")) {
           
        if(infos !== ""){
            if (taskHeader.innerHTML !== infos) {
                // if (taskHeader.innerHTML !== infos[0]) {

                resolve(infos);
                
            } else {
    
                UI.error("It exists already! Please try another one.");
            }

        } else{
            UI.error("Please Fill The Blanks.");
        }
           
        // } else {
        //     UI.error("Please Fill The Blanks.");
        // }
        e.preventDefault();
    }).then(infos=>{
                taskHeader.innerHTML = infos;
                // taskHeader.innerHTML = infos[0];
                // calendarDescription.innerHTML = infos[1];
    
                // //Setting the created Date
                // let today = new Date();
                // let dd = String(today.getDate()).padStart(2, '0');
                // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                // let yyyy = today.getFullYear();
                // today = mm + '/' + dd + '/' + yyyy;
                // //Setting the created Date.
                // calendarCreatedDate.innerText = today;
    
                // //Removing the limitations
                //calendarCreatedDate.classList.remove("disabled-header");
                //calendarDescription.classList.remove("disabled-header");
                taskHeader.classList.remove("disabled-header"); ///->Removes disabled header style.
                UI.errorBlock("routing_processes", "message", "remove"); //->Removes the Warning Message.
                EnablingAllFormInputs();//-> Enables the access on form elements.
    
                UI.clearInputs([CreateTitle, description]);  
               
    }).then(()=>{
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Created!',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            UI.deleteAllFromUI()
            sideBar.classList.remove("bringMenu");
        })
      
    })
})