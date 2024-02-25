let right = document.querySelector("#right");

right.addEventListener("click", () => {
  let currentColor = getComputedStyle(right).backgroundColor;

  if (currentColor == "rgb(0, 0, 0)") {
    right.style.background = "rgb(255,0,0)";
    right.style.transform = "translateY(-100px)";
  } else {
    right.style.background = "rgb(0, 0, 0)";
    right.style.transform = "translateY(0px)";
  }
});

let left = document.querySelector("#left");
left.addEventListener("click", () => {
  left.style.transform = "translateX(-100px)";
  left.style.background = "rgb(0, 0, 0)";
});

let footer = document.querySelectorAll(".footer");
footer.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.background = "rgb(0, 255, 0)";
  });
});
