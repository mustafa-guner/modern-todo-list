

//Profile Information section
const profile = document.querySelector(".profile-informations");
const profileBnt = document.getElementById("profile");
const closeProfile = document.getElementById("close-profile")

$(profileBnt).click(()=>{
    $(profile).toggleClass("active-profile")
})

$(closeProfile).click(()=>{
    $(profile).removeClass("active-profile")
})