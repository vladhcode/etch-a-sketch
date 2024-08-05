document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const resetButton = document.getElementById("reset");
  const resizeButton = document.getElementById("resize");
  const randomColorButton = document.getElementById("randomColor");
  const darkenButton = document.getElementById("darken");

  let currentMode = "default";

  function createGrid(size) {
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("mouseover", () => handleMouseOver(cell));
      cell.style.backgroundColor = "white";
      container.appendChild(cell);
    }
  }
  function handleMouseOver(cell) {
    if (currentMode === "random") {
      cell.style.backgroundColor = getRandomColor();
    } else if (currentMode === "darken") {
      let currentColor = cell.style.backgroundColor;
      if (currentColor === "white") {
        currentColor = "rgba(0, 0, 0, 0.1)";
      } else {
        let rgba = currentColor.match(
          /rgba?\((\d+), (\d+), (\d+),? ?(\d*\.?\d+)?\)/
        );
        if (rgba) {
          let alpha = rgba[4] ? parseFloat(rgba[4]) : 1;
          alpha = Math.min(alpha + 0.1, 1);
          currentColor = `rgba(0, 0, 0, ${alpha})`;
        }
      }
      cell.style.backgroundColor = currentColor;
    } else {
      cell.style.backgroundColor = "black";
    }
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  resetButton.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.style.backgroundColor = "white"));
  });

  resizeButton.addEventListener("click", () => {
    let newSize = prompt("Enter new grid size (max 100):");
    newSize = parseInt(newSize);
    if (newSize && newSize > 0 && newSize <= 100) {
      createGrid(newSize);
    } else {
      alert("Please enter a valid number between 1 and 100.");
    }
  });
  randomColorButton.addEventListener("click", () => {
    currentMode = "random";
  });
  darkenButton.addEventListener("click", () => {
    currentMode = "darken";
  });

  createGrid(16);
});
