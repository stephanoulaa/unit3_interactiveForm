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

// define design menu section
const designSection = document.getElementById('design');
const colorSection = document.getElementById('colors-js-puns');
const colorOptions = document.getElementById('color').children;
colorSection.style.display = 'none';

//const choosePunOption = document.createElement("option");
//choosePunOption.text = "Choose a JS Puns T-Shirt";
//colorSection.appendChild(choosePunOption);

// add event listener for when user chooses a design, it hides the other 3 that aren't relevant
designSection.addEventListener('change', (e) => {
    for (var i=0; i<colorOptions.length; i+=1) {
        colorOptions[i].style.display = 'none';
        if (e.target.value === 'js puns') {
            // show first three colors
            colorSection.style.display = '';
            colorOptions[0].style.display = '';
            colorOptions[1].style.display = '';
            colorOptions[2].style.display = '';
        } else if (e.target.value === 'heart js') {
            // show last three colors
            colorOptions[3].style.display = '';
            colorOptions[4].style.display = '';
            colorOptions[5].style.display = '';
            colorSection.style.display = '';
        } 
//        else if (e.target === designSection.firstElementChild) {
//            const selectThemeLabel = document.querySelector("label[for='design']");
//            colorSection.style.display = '';
//            selectThemeLabel.innerHTML = "Please Select A T-Shirt Theme:"
//        }
    }
});

// REGISTER FOR ACTIVITIES SECTION:

// total cost of checked activities
let totalCost = 0;
const totalCostLabel = document.createElement('label');

// define activities section and locate all activities inputs
const activities = document.querySelector('.activities');
const listOfActivities = activities.querySelectorAll('input');
//listOfActivities[i].attributes.getNamedItem('data-cost').value;

//let chosenActivities = [];

//// loop through all activities by PRICE
//for (var i=0; i<listOfActivities.length; i+=1) {
//    if (listOfActivities.checked) {
////        chosenActivities.push(listOfActivities[i].attributes.getNamedItem('data-cost').value);
////        console.log(chosenActivities);
//        console.log("checked!");
//    }
//}

// loop through all activity inputs and record their name, day/time, checked status and cost
for (var i=0; i<listOfActivities.length; i+=1) {
    listOfActivities[i].addEventListener('change', (e) => {
        const activityChecked = e.target.checked;
        const activityName = e.target.attributes.getNamedItem('name');
        const dataCostVal = e.target.attributes.getNamedItem('data-cost');
        const activityDate = e.target.attributes.getNamedItem('data-day-and-time');
        // call addActivities() function here
        addActivities(activityChecked, activityName, dataCostVal, activityDate);
    })

}


// add conditionals: 
//  when item is checked, add to the total and display on page
//  when item is unchecked, subtract from the total and display on page
//  when total is 0, DONT display on page

function addActivities(activityChecked, activityName, dataCostVal, activityDate) {
    if (activityChecked) {
        totalCost += parseInt(dataCostVal.textContent);
        displayTotalCost(totalCost);
        // make sure we are not including first activity in the function
        if (activityName.textContent !== "all") {
          avoidOverlappingDates(activityDate, activityName);
        }
      } else {
        // again need to ignore first activity
        if (activityName.textContent !== "all") {
          for (let i = 1; i < listOfActivities.length; i++) {
            if (activityDate.textContent === listOfActivities[i].attributes.getNamedItem("data-day-and-time").textContent) {
              listOfActivities[i].removeAttribute("disabled");
            }
          } //end of for loop
        }
        totalCost -= parseInt(dataCostVal.textContent);
        displayTotalCost(totalCost);
        if (totalCost === 0) {
          activities.removeChild(totalCostLabel);
        }
    } // end of else
}



// use label element we created to dislay total cost, by appending below activities section
function displayTotalCost() {
    totalCostLabel.textContent = 'Total Cost: $' + totalCost;
    activities.appendChild(totalCostLabel);
}

// create function that checks if the day/time of activities overlap by comparing name attribute 
// if they do overlap, 'disabled' attribute is added so the user cannot choose it
function avoidOverlappingDates(activityDate, activityName) {
    // loop thru all dates (start with 1 because first activity is on all days)
  for (let i = 1; i < listOfActivities.length; i++) {
    if (activityName !== listOfActivities[i].attributes.getNamedItem("name")) {
      if (activityDate.textContent === listOfActivities[i].attributes.getNamedItem("data-day-and-time").textContent) {
        listOfActivities[i].setAttribute("disabled", "");
      }
    }
  } // end of for loop
};

//console.log(listOfActivities.attributes.getNamedItem('data-cost').value);
//const dataCostAttribute = listOfActivities.attributes.getAttribute('data-cost');
//console.log(dataCostAttribute);














