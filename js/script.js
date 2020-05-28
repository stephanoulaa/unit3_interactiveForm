// place 'focus' state on name field
document.getElementById('name').focus();


// JOB ROLE SECTION:

// define DOM Elements for job role, and hide "other" input until needed
const selectTitle = document.getElementById('title');
const otherTitle = document.getElementById('other-title')
otherTitle.style.display = 'none';

// event listener for when user clicks "Other" on job role dropdown
selectTitle.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherTitle.style.display = '';
  } else {
    otherTitle.style.display = 'none';
  }
});

// T-SHIRT SECTION:
const selectThemeLabel = document.querySelector("label[for='design']");
selectThemeLabel.innerHTML = "Please Select A T-Shirt Theme:"

// define design menu section
const selectColorLabel = document.querySelector("label[for='color']");
const designSection = document.getElementById('design');
const colorSection = document.getElementById('colors-js-puns');
const colorOptions = document.getElementById('color').children;
colorSection.style.display = 'none';

//const choosePunOption = document.createElement("option");
//choosePunOption.text = "Choose a JS Puns T-Shirt";
//colorSection.appendChild(choosePunOption);


// add event listener for when user chooses a design, it hides the other 3 that aren't relevant
designSection.addEventListener('change', (e) => {
    selectColorLabel.innerHTML = "Please Select A Color:"
    for (var i=0; i<colorOptions.length; i+=1) {
        if (e.target.value === 'js puns') {
            // show first three colors
            colorOptions[3].hidden = true;
            colorOptions[4].hidden = true;
            colorOptions[5].hidden = true;
            colorSection.style.display = '';
        } else if (e.target.value === 'heart js') {
            // show last three colors
            colorOptions[0].hidden = true;
            colorOptions[1].hidden = true;
            colorOptions[2].hidden = true;
            colorSection.style.display = '';
        }
    }
});




