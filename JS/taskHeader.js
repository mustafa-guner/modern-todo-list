
const createTaskHeaderForm = document.getElementById("createTaskHeader");

createTaskHeaderForm.addEventListener("submit",(e)=>{
    const CreateTitle = document.getElementById("CreateTitle");
    const description = document.getElementById("descrpt-project");

    let infos = [CreateTitle.value,description.value];

    //If Form Has Any Empty Value
    if(infos.every(element=>element!=="")){
      
        taskHeader.innerHTML = infos[0];
        calendarDescription.innerHTML = infos[1];

        //Setting the created Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        calendarCreatedDate.innerText = today;

        //Removing the limitations
        calendarCreatedDate.classList.remove("disabled-header");
        calendarDescription.classList.remove("disabled-header");
        taskHeader.classList.remove("disabled-header"); ///->Removes disabled header style.
        UI.errorBlock("routing_processes","message","remove"); //->Removes the Warning Message.
        EnablingAllFormInputs();//-> Enables the access on form elements.
        
        UI.clearInputs([CreateTitle,description]);
        UI.successful("Task Title Has Been Added Succesfuly.");
       
    } else{
        UI.error("Please Fill The Blanks.");
    }
    e.preventDefault();
})