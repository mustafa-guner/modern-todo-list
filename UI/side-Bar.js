//Open SideBar
const sideBar = document.getElementById("side-bar");
const button = document.getElementById("hamburger");
button.onclick = () => {
    sideBar.classList.add("bringMenu");

}

const closeBtn = document.getElementById("closeBtn")
//Close SideBar
closeBtn.onclick = () => {
    sideBar.classList.remove("bringMenu");

}