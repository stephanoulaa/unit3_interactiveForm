// place 'focus' state on name field
document.getElementById('name').focus();


// define array to hold all error messages to be used later
let errorMsgs = [];

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
        const activityDate = e.target.attributes.getNamedItem('data-day-and-time');
        const activitiesPrice = e.target.attributes.getNamedItem('data-cost');
        // call addActivities() function here
        addActivities(activityChecked, activityName, activitiesPrice, activityDate);
    })

}


// add conditionals: 
//  when item is checked, add to the total and display on page
//  when item is unchecked, subtract from the total and display on page
//  when total is 0, DONT display on page

function addActivities(activityChecked, activityName, activitiesPrice, activityDate) {
    if (activityChecked) {
        totalCost += parseInt(activitiesPrice.textContent);
        displayTotalCost(totalCost);
        // make sure we are not including first activity in the function
        if (activityName.textContent !== 'all') {
          avoidOverlappingDates(activityDate, activityName);
        }
      } else {
        // again need to ignore first activity
        if (activityName.textContent !== 'all') {
          for (let i = 1; i < listOfActivities.length; i++) {
            if (activityDate.textContent === listOfActivities[i].attributes.getNamedItem('data-day-and-time').textContent) {
              listOfActivities[i].removeAttribute('disabled');
            }
          } //end of for loop
        }
        //suptract from total cost if activity is unchecked
        totalCost -= parseInt(activitiesPrice.textContent);
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
    if (activityName !== listOfActivities[i].attributes.getNamedItem('name')) {
      if (activityDate.textContent ===listOfActivities[i].attributes.getNamedItem('data-day-and-time').textContent) {
        listOfActivities[i].setAttribute('disabled', '');
      }
    }
  } // end of for loop
};

//console.log(listOfActivities.attributes.getNamedItem('data-cost').value);
//const dataCostAttribute = listOfActivities.attributes.getAttribute('data-cost');
//console.log(dataCostAttribute);


// PAYMENT INFO SECTION:

// define relevant payment variables
const paymentMenu = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
// credit card option is shown by default so others are initially hidden
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// remove this choice so that the user can't use it
const invalidPaymentChoice = paymentMenu.firstElementChild;
invalidPaymentChoice.remove();
//console.log(invalidPaymentChoice);

// add event listener so that only selected payment method is shown
paymentMenu.addEventListener('change', () => {
    if (paymentMenu.value == 'credit card') {
        console.log('credit card selected!');
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } if (paymentMenu.value == 'paypal') {
        console.log('paypal selected!');
        paypal.style.display = '';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    } if (paymentMenu.value == 'bitcoin') {
        console.log('bitcoin selected!');
        bitcoin.style.display = '';
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
    }
});


// FORM VALIDATION SECTION:

// validate name field:
const nameInput = document.getElementById('name');
const nameLabel = document.createElement('label');

const isValidName = () => {
    
    // define regex, error message and element where error msg will go (above input)
    const nameRegex = /^[A-Za-z]+$/;
    const errorMsgName = 'Please enter a valid name.';
    const msgElementName = nameInput.previousElementSibling.textContent;

    // if input matches with regex, add the purple 'valid' border
    if (nameRegex.test(nameInput.value)) {
        nameInput.style.border = '2px solid purple';
        if (msgElementName === errorMsgName) {
          // also delete error message/red 'error' border if it exists
          nameInput.previousElementSibling.remove();
        }
    } else {
        // when name is not valid, add red border and red error message label
        nameInput.style.border = '2px solid red';
        if (msgElementName === 'Name:') {
          const errorLabelName = document.createElement('label');
          errorLabelName.style.color = 'red';
          errorLabelName.textContent = errorMsgName;
          // make sure this label is inserted above the input but below the 'Name' label
          nameInput.parentNode.insertBefore(errorLabelName, nameInput);
        }
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(msgElementName);
      }
}


// validate email field (same as name field validation):
const emailInput = document.getElementById('mail');
const emailLabel = document.createElement('label');

const isValidEmail = () => {
    
    // define regex, error message and element where error msg will go (above input)
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const errorMsg = 'Please enter a valid email.';
    const msgElement = emailInput.previousElementSibling.textContent;

    // if input matches with regex, add the purple 'valid' border
    if (emailRegex.test(emailInput.value)) {
        emailInput.style.border = '2px solid purple';
        if (msgElement === errorMsg) {
          // also delete error message/red 'error' border if it exists
          emailInput.previousElementSibling.remove();
        }
    } else {
        // when email is not valid, add red border and red error message label
        emailInput.style.border = '2px solid red';
        if (msgElement === 'Email:') {
          const errorLabel = document.createElement('label');
          errorLabel.style.color = 'red';
          errorLabel.textContent = errorMsg;
          // make sure this label is inserted above the input but below the 'Email' label
          emailInput.parentNode.insertBefore(errorLabel, emailInput);
        }
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(msgElement);
      }
}

// user must select at least ONE activity:

const activitiesValidation = () => {
    // to figure this out, use the same array of activities to check all of them together
    let checkedEvents = [];
    
    //use listOfActivities var from earlier
    for (var i=0; i<listOfActivities.length; i+=1) {
        if (listOfActivities[i].checked) {
            checkedEvents.push(listOfActivities[i].checked);
            console.log(checkedEvents);
        }
    }
    
    // if array is empty, display an error message that asks user to check at least 1 activity
    if (checkedEvents.length === 0) {
        // replace activities header with this error message
        activities.firstElementChild.innerHTML = 'Please check at least 1 activity.';
        activities.firstElementChild.style.color = 'red';
        // push to error messages array like we did the other fields
        errorMsgs.push(activities.firstElementChild.innerHTML);
    } else if (checkedEvents.length > 0) {
        // display normal message with given CSS colors if at least 1 activity is checked
        activities.firstElementChild.textContent = 'Register for Activities';
        activities.firstElementChild.style.color = 'rgba(6, 49, 68, 0.9)';
    }
}

// credit card number needs 13-16 digits: (ONLY VALIDATE IF SELECTED)
const cardInput = document.getElementById('cc-num');
const cardLabel = document.createElement('label');

const creditCardValidation = () => {
    const cardRegex = /^\d{13,16}$/;
    const cardError = 'Please Enter a Valid Credit Card Number.';
    const newCardEl = cardInput.previousElementSibling.textContent;

    // if input matches with regex, add the purple 'valid' border
    if (cardRegex.test(cardInput.value)) {
        cardInput.style.border = '2px solid purple';
        if (newCardEl === cardError) {
          // also delete error message/red 'error' border if it exists
          cardInput.previousElementSibling.remove();
        }
    } else {
        // when card num is not valid, add red border and red error message label
        cardInput.style.border = '2px solid red';
        if (newCardEl === 'Card Number:') {
          const cardLabel = document.createElement('label');
          cardLabel.style.color = 'red';
          cardLabel.textContent = cardError;
          // make sure this label is inserted above the input but below the 'Card Number' label
          cardInput.parentNode.insertBefore(cardLabel, cardInput);
        }
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(newCardEl);
      }
    
}
// zip code needs 5 digits:
const zipInput = document.getElementById('zip');
const zipLabel = document.createElement('label');

const zipCodeValidation = () => {
    const zipRegex = /^\d{5}$/;
    const zipError = 'Please Enter a Valid Zip Code.';
    const newZipEl = zipInput.previousElementSibling.textContent;

    // if input matches with regex, add the purple 'valid' border
    if (zipRegex.test(zipInput.value)) {
        zipInput.style.border = '2px solid purple';
        if (newZipEl === zipError) {
          // also delete error message/red 'error' border if it exists
          zipInput.previousElementSibling.remove();
        }
    } else {
        // when zip code is not valid, add red border and red error message label
        zipInput.style.border = '2px solid red';
        if (newZipEl === 'Zip Code:') {
          const zipLabel = document.createElement('label');
          zipLabel.style.color = 'red';
          zipLabel.textContent = zipError;
          // make sure this label is inserted above the input but below the 'Zip Code' label
          zipInput.parentNode.insertBefore(zipLabel, zipInput);
        }
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(newZipEl);
      }
    
    
}

// cvv should be 3 digits:
const cvvInput = document.getElementById('cvv');
const cvvLabel = document.createElement('label');

const cvvValidation = () => {
    const cvvRegex = /^\d{3}$/;
    const cvvError = 'Please Enter a Valid CVV Number.';
    const newCvvEl = cvvInput.previousElementSibling.textContent;

    // if input matches with regex, add the purple 'valid' border
    if (cvvRegex.test(cvvInput.value)) {
        cvvInput.style.border = '2px solid purple';
        if (newCvvEl === cvvError) {
          // also delete error message/red 'error' border if it exists
          cvvInput.previousElementSibling.remove();
        }
    } else {
        // when cvv num is not valid, add red border and red error message label
        cvvInput.style.border = '2px solid red';
        if (newCvvEl === 'CVV:') {
          const cvvLabel = document.createElement('label');
          cvvLabel.style.color = 'red';
          cvvLabel.textContent = cvvError;
          // make sure this label is inserted above the input but below the 'CVV' label
          cvvInput.parentNode.insertBefore(cvvLabel, cvvInput);
        }
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(newCvvEl);
      }
    
    
}



// Check ALL validations when user submits form
nameInput.addEventListener('input', isValidName);

emailInput.addEventListener('input', isValidEmail);

for (var i=0; i<listOfActivities.length; i+=1) {
  listOfActivities[i].addEventListener('click', activitiesValidation);
}

cardInput.addEventListener('input', creditCardValidation);
zipInput.addEventListener('input', zipCodeValidation);
cvvInput.addEventListener('input', cvvValidation);



/**
* on submit, all functions are called.
* if there are no errors in the array, the page will be allowed to submit (in this case 
* we will just refresh the page).
*/
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    errorMsgs = [];
    e.preventDefault();
    // call above functions to validate each relevant field
    isValidName();
    isValidEmail();
    activitiesValidation();
    creditCardValidation();
    zipCodeValidation();
    cvvValidation();
    
    // if there are no more error messages, refresh the page
    // this is because we can't actually submit the form
    if (errorMsgs.length ===0) {
        window.location.reload(true);
        return false;
    }
});
















