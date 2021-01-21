 //Saved Task Lists
 const savedTasks = document.getElementById("doneUI");
 const closeSaved = document.getElementById("closeSaved");
 const savedSection = document.querySelector(".savedLists");

savedTasks.addEventListener("click",()=>{
    savedSection.classList.add("bringDoneUI");
 })


 closeSaved.addEventListener("click",()=>{
    savedSection.classList.remove("bringDoneUI");
 })
