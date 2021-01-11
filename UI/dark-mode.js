//Functionality of DARK-MODE Switcher 

var checkbox = document.querySelector("input[name=theme]");
checkbox.addEventListener("change", function () {
    if (this.checked) {
        trans();
        document.documentElement.setAttribute("data-theme", "dark")
        sideBar.setAttribute("style", "background-image:url('../Images/gece4.jpg')")

    } else {
        trans();
        document.documentElement.setAttribute("data-theme", "light");
        sideBar.setAttribute("style", "background-image:url('../Images/gunduz.jpg')")
    }
})

function trans() {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000)
}   