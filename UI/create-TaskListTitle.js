//Creating UI Section
const createUI = document.getElementById("createUI");
const closeCreating = document.getElementById("closeCreating");
const creatingSection = document.querySelector(".creating-UI");

createUI.onclick = ()=>{
    creatingSection.classList.add("bringCreatingUI");
}

closeCreating.onclick = ()=>{
    creatingSection.classList.remove("bringCreatingUI");
}


