// 16x16 grid of square divs
const container = document.querySelector(".container");

function addDiv() {
  for (let i = 0; i < 16 * 16; i++) {
    const newDiv = document.createElement("div");
    container.appendChild(newDiv);
  }
}
addDiv();

// hover effect so that the grid divs change color when your mouse passes over them
const mouseHoverElements = container.querySelectorAll("div");
let isMouseDown = false;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

mouseHoverElements.forEach((element) => {
  element.addEventListener("mouseover", (event) => {
    if (isMouseDown) {
      event.target.style.background = "yellow";
    }
  });
});
