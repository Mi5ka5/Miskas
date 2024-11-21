// Defining components of the html
const mouseBckg = document.getElementById("color");
const title = document.getElementById("maintext");
const bckgBeam = document.getElementById("color-beam");
const bckgBeamStart = document.getElementById("color-beam-start");
const borderLeft = document.getElementById("border-left");
const borderRight = document.getElementById("border-right");
const snappable = document.getElementsByClassName("snappable");
var snapOn = title;

document.addEventListener("mousemove", function(event) {
// Getting the x and y values of the mouse
    var x = event.clientX;
    var y = event.clientY;
// Movin the funky lil colorful background
    mouseBckg.style.left = (x - (window.innerWidth / 5)/2) + "px";
    mouseBckg.style.top = (y - (window.innerHeight / 5)/2) + "px";

// Lettin the title move towards you
    title.style.left = (((x/window.innerWidth)-0.5)*5+"px");
    title.style.top = (((y/window.innerHeight)-0.5)*5+"px");

// Gettin tha distance between cursor n the start of the beam
    const beamStartRect = bckgBeamStart.getBoundingClientRect();
    const beamStartX = beamStartRect.left + (beamStartRect.width / 2);
    const beamStartY = beamStartRect.top + (beamStartRect.height / 2);
    const beamDistance = Math.sqrt((x - beamStartX) ** 2 + (y - beamStartY) ** 2);
    const beamAngle = Math.atan2(y - beamStartY, x - beamStartX);

// Settin tha beam's position, rotation etc.
    bckgBeam.style.left = beamStartX +"px";
    bckgBeam.style.top = beamStartY + "px";
    bckgBeam.style.transform = `rotate(${beamAngle}rad)`;
    bckgBeam.style.width = beamDistance + "px";

// Proximity feel
    borderLeft.style.opacity = Math.abs(x - window.innerWidth) / window.innerWidth;
    borderRight.style.opacity = x / window.innerWidth;
});

// hehe funky lil opacity funny fun
document.addEventListener("mousedown", function(event) {
    mouseBckg.style.opacity = 0.1;
    borderLeft.style.opacity = 1;
    borderRight.style.opacity = 1;
});
document.addEventListener("mouseup", function(event) {
    mouseBckg.style.opacity = 0.25;
    borderLeft.style.opacity = Math.abs(event.clientX - window.innerWidth) / window.innerWidth;
    borderRight.style.opacity = event.clientX / window.innerWidth;
});

// snap on tha beam on to tha thing
for (var i = 0; i < snappable.length; i++) {
    snappable[i].addEventListener("pointerenter", function(event){
        snapOn = event.srcElement;
        const itemRect = snapOn.getBoundingClientRect();
        bckgBeamStart.style.left = itemRect.left + (itemRect.width / 2) + "px";
        bckgBeamStart.style.top = itemRect.top + (itemRect.height / 2) + bckgBeam.style.height/2 + "px";
    });
}
