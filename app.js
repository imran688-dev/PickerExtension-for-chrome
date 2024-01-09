
// TODO 1: Select all selectors - done
// TODO 2: Make pick color btn function - done
// TODO 3: Make copy color function - done
// TODO 4: Show color on the Dom - done
// TODO 5: Clear button to clear all the previous colors - done
// TODO 6: Local storage - done

//  Selectors
const colorPicker = document.getElementById("color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
// const pickedColors = [];
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || []);

// Step 01
const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    // console.log(eyeDropper);
    // const test = eyeDropper.open();
    // console.log(test);
    const colorCode = await eyeDropper.open();
    // console.log(colorCode.sRGBHex);
    // copy to clipboard
    navigator.clipboard.writeText(colorCode.sRGBHex);
    pickedColors.push(colorCode.sRGBHex);

    // step 04
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    // console.log(pickedColors);
    showColor();
  } catch (error) {
    alert("failed");
  }

}

colorPicker.addEventListener("click", activateEyeDropper);


// Step 02
const showColor = () => {
  // if (!pickedColors.length) {
  //   return;
  // }
  if (pickedColors.length > 0) {
    document.querySelector(".picked-colors").style.display = "block";
    colorList.innerHTML = pickedColors.map((color) => `
    <li class="color">
      <span class="rect" style="background-color:${color}"></span>
      <span class="value hex">${color}</span>
    </li>
    `
    ).join("");


    // step 06 (copy color)
    let colors = document.querySelectorAll(".color");
    console.log(colors);
    colors.forEach((li) => {
      li.addEventListener("click", (e) => {
        let color = e.target.innerText;
        navigator.clipboard.writeText(color);
        e.target.innerText = "Copied";
        setTimeout(() => (e.target.innerText = color), 500);
      });
    }); // issue is solved

  } else {
    document.querySelector(".picked-colors").style.display = "none";
    // colorList.innerHTML = "<li>No color found</li>";
  }

};

showColor();



// step 03
const clearAllColor = () => {
  // colorList.innerHTML = "";

  // step 05
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").style.display = "none";
}

clearAll.addEventListener("click", clearAllColor);



