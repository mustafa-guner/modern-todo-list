//Profile Information section
const profile = document.querySelector(".profile-informations");
const profileBnt = document.getElementById("profile");
const closeProfile = document.getElementById("close-profile")

profileBnt.onclick = () => {
    profile.classList.add("active-profile")
}

closeProfile.onclick = () => {
    profile.classList.remove("active-profile")
}