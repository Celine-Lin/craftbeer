const blobContainer = document.getElementById("banner");

// Default background position
let xPercent = 50;
let yPercent = 50;

// Default animation for the gradient blob using GSAP
const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
tl.to(blobContainer, {
  duration: 2,
  ease: "power1.inOut",
  background: `radial-gradient(circle at ${xPercent}% ${yPercent}%,#D67157 0%, #FFBC8F 50%,#F2F2F2 100%)`
});

// Function to update the gradient position on mouse move
function moveGradient(event) {
  // Calculate the mouse position from 0 to 100 within the container
  xPercent = (event.clientX / window.innerWidth) * 100;
  yPercent = (event.clientY / window.innerHeight) * 100;

  // Update the gradient position
  updateGradient(xPercent, yPercent);

  // Pause the default animation
  tl.pause();
}

// Function to update the gradient background
function updateGradient(x, y) {
  // Use GSAP to animate the background change
  gsap.to(blobContainer, {
    background: `radial-gradient(circle at ${x}% ${y}%, #D67157 0%, #FFBC8F 50%,#F2F2F2 100%)`,
    duration: 0.5,
    ease: "none"
  });
}

// Add mouse move event listener
document.addEventListener("mousemove", moveGradient);

// Optional: Restart the default animation when mouse leaves the container
blobContainer.addEventListener("mouseleave", () => {
  tl.restart();
});

// Optional: Restart the default animation after a period of inactivity
let inactivityTimeout;

document.addEventListener("mousemove", () => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    tl.restart();
  }, 200000);
});