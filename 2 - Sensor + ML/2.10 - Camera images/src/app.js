//volume and play/pause
let video = document.getElementById("movie");
let numOfImages = 7;

function draw(predictions) {
  let container = document.getElementById("container");
  let sound = document.getElementById("sound");
  let rect = document.getElementById("rect");
  let widthCanvas = document.getElementById("canvas").width;
  let heightCanvas = document.getElementById("canvas").height;
  let widthWindow = window.innerWidth;
  let heightWindow = window.innerHeight;

  //img
  let img = document.querySelector("#img");


  //divide the screen
  let screenSection = heightWindow / numOfImages;

  if (predictions.length > 0) {
    let close = predictions.filter((item) => item.label === "closed");
    if (close.length >= 1) {
      let xClose = close[0].bbox[0];
      let yClose = close[0].bbox[1];

      let yCloseMap = mapRange(yClose, 0, heightCanvas, 0, heightWindow);
      const sectionNumber = findImageSection(yCloseMap, screenSection);
      img.src = `src/img/${sectionNumber}.png`;
      img.style.transform = `scale(${sectionNumber / 2})`;
    }
  }
}

// map function
function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}

//this function will find the section of the image
function findImageSection(mouseY, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && mouseY < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (mouseY < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(mouseY, screenSection, section + 1);
  }
}
