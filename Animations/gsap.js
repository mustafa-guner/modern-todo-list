
//Creating GSAP Object for smooth animations

let tl = gsap.timeline();

//Header

tl.fromTo("h1",{
    y:100,
    opacity:0
},{
    y:0,
    opacity:1,
    duration:1.3
})

//Paragraph
tl.fromTo("p",{
    x:-100,
    opacity:0
},{
    x:0,
    opacity:1,
    duration:1
},"h1+=.2");

//Button
tl.fromTo("#directorBtn",{
    opacity:0
    
},{
    opacity:1
});


//RIGHT SECTIONS STARS

tl.fromTo(
    ".fa-star",
    {
      x: 0,
      y: 0,
    },
    {
      y: 15,
      repeat: -1,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
    },"h1-=1"
  )