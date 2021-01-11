 //Saved Task Lists
 const savedTasks = document.getElementById("doneUI");
 const closeSaved = document.getElementById("closeSaved");
 const savedSection = document.querySelector(".savedLists");

 savedTasks.onclick = () => {
    
     savedSection.classList.add("bringDoneUI");
 }

closeSaved.onclick = () => {
    savedSection.classList.remove("bringDoneUI");
 }