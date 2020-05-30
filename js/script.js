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
//colorSection.style.display = 'none';
colorSection.hidden = true;

// add event listener for when user chooses a design, it hides the other 3 that aren't relevant
designSection.addEventListener('change', (e) => {
    for (var i=0; i<colorOptions.length; i+=1) {
         
        // js puns conditional
        if (e.target.value === 'js puns') {
            if (colorOptions[i].textContent.includes('JS Puns')) {
                colorOptions[i].style.display = '';
            }  else {
                colorOptions[i].style.display = 'none';
            }
            // included below line in this if/else statement to fix bug
            // the bug would show wrong type of shirt as first option in select menu
            colorOptions[0].selected = true;
            colorSection.hidden = false;
         } 
        
        // i heart js conditional
        else if (e.target.value === 'heart js') {
            if (colorOptions[i].textContent.includes('JS shirt')) {
                colorOptions[i].style.display = '';
            }  else {
                colorOptions[i].style.display = 'none';
            }
            colorOptions[3].selected = true;
            colorSection.hidden = false;
         } else {
             colorSection.hidden = true;
         }
          
    } // end of for loop
});


// REGISTER FOR ACTIVITIES SECTION:

// total cost of checked activities
let totalCost = 0;
const totalCostLabel = document.createElement('label');

// define activities section and locate all activities inputs
const activities = document.querySelector('.activities');
const listOfActivities = activities.querySelectorAll('input');

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

// PAYMENT INFO SECTION:

// define relevant payment variables
const paymentMenu = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
// credit card option is shown by default so others are initially hidden
paypal.hidden = true;
bitcoin.hidden = true;


// remove this choice so that the user can't use it
const invalidPaymentChoice = paymentMenu.firstElementChild;
invalidPaymentChoice.remove();
//console.log(invalidPaymentChoice);


// add event listener so that only selected payment method is shown
paymentMenu.addEventListener('change', () => {
    if (paymentMenu.value == 'credit card') {
        console.log('credit card selected!');
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } if (paymentMenu.value == 'paypal') {
        console.log('paypal selected!');
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    } if (paymentMenu.value == 'bitcoin') {
        console.log('bitcoin selected!');
        bitcoin.hidden = false;
        paypal.hidden = true;
        creditCard.hidden = true;
    }
});


// NAME VALIDATOR:

// first, define array to hold all error messages to be used later
let errorMsgs = [];

const nameInput = document.getElementById('name');
const nameLabel = document.createElement('label');

const isValidName = () => {
    // define regex, error message and element where error msg will go (above input)
    const nameRegex = /^[A-Za-z]+$/;
    const errorMsgName = 'Please enter a valid name.';
    const msgElementName = nameInput.previousElementSibling.textContent;
    const nameTitle = 'Name:';
    // theValidator(nameTitle, nameRegex, errorMsgName, msgElementName, nameInput, nameLabel);
    
    const altError = /^[A-Za-z0-9]+$/;
    const altErrorMessage = "Sorry, this field cannot contain a number (unless your name is X Æ A-12)."
    
    // if input matches with regex, add the purple 'valid' border
    if (nameRegex.test(nameInput.value)) {
        nameInput.style.border = '2px solid purple';
        if (msgElementName === errorMsgName) {
          // also delete error message if it exists
          nameInput.previousElementSibling.remove();
        }
        if (msgElementName === altErrorMessage) {
          // also delete NUMBER error message if it exists
          nameInput.previousElementSibling.remove();
        }
    } 
    
    // tests if name input has a number
    else if (altError.test(nameInput.value)) {
        nameInput.style.border = '2px solid red';
            
        if (msgElementName === nameTitle) {
          const nameLabel = document.createElement('label');
          nameLabel.style.color = 'red';
          nameLabel.textContent = altErrorMessage;
          // make sure this label is inserted above the input but below the 'NAME' label
          nameInput.parentNode.insertBefore(nameLabel, nameInput);
        }
            
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(msgElementName);
    } 
    
    // tests if name input has other things that would make it invalid (such as a special character)
     else if (nameRegex.test(nameInput.value)) {
        nameInput.style.border = '2px solid red';
            
        if (msgElementName === nameTitle) {
          const nameLabel = document.createElement('label');
          nameLabel.style.color = 'red';
          nameLabel.textContent = errorMsgName;
          // make sure this label is inserted above the input but below the 'NAME' label
          nameInput.parentNode.insertBefore(nameLabel, nameInput);
        }
            
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(msgElementName);
    }
    
    else {
        // when NAME is not valid, add red border and red error message label
        nameInput.style.border = '2px solid red';
            
        if (msgElementName === nameTitle) {
          const nameLabel = document.createElement('label');
          nameLabel.style.color = 'red';
          nameLabel.textContent = errorMsgName;
          // make sure this label is inserted above the input but below the 'NAME' label
          nameInput.parentNode.insertBefore(nameLabel, nameInput);
        }
            
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(msgElementName);
    }
    
}


// EMAIL VALIDATOR:
const emailInput = document.getElementById('mail');
const emailLabel = document.createElement('label');

const isValidEmail = () => {
    const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const errorMsg = 'Please enter a valid email.';
    const msgElement = emailInput.previousElementSibling.textContent;
    const emailTitle = 'Email:';
    theValidator(emailTitle, emailRegex, errorMsg, msgElement, emailInput, emailLabel);
}

// ACTIVITIES VALIDATOR:
const activitiesValidation = () => {
    // to figure this out, use the same array of activities to check all of them together
    let checkedEvents = [];
    
    //use listOfActivities var from earlier
    for (var i=0; i<listOfActivities.length; i+=1) {
        if (listOfActivities[i].checked) {
            checkedEvents.push(listOfActivities[i].checked);
            //console.log(checkedEvents);
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


// CREDIT CARD NUM VALIDATOR:
const cardInput = document.getElementById('cc-num');
const cardLabel = document.createElement('label');

const creditCardValidation = () => {
    const cardRegex = /^\d{13,16}$/;
    const cardError = 'Please Enter a Valid Credit Card Number.';
    const newCardEl = cardInput.previousElementSibling.textContent;
    const cardTitle = 'Card Number:';
    theValidator(cardTitle, cardRegex, cardError, newCardEl, cardInput, cardLabel);
    
}

// ZIP CODE VALIDATOR:
const zipInput = document.getElementById('zip');
const zipLabel = document.createElement('label');

const zipCodeValidation = () => {
    const zipRegex = /^\d{5}$/;
    const zipError = 'Please Enter a Valid Zip Code.';
    const newZipEl = zipInput.previousElementSibling.textContent;
    const zipTitle = 'Zip Code:';
    theValidator(zipTitle, zipRegex, zipError, newZipEl, zipInput, zipLabel);
}

// CVV NUM VALIDATOR:
const cvvInput = document.getElementById('cvv');
const cvvLabel = document.createElement('label');

const cvvValidation = () => {
    const cvvRegex = /^\d{3}$/;
    const cvvError = 'Please Enter a Valid CVV Number.';
    const newCvvEl = cvvInput.previousElementSibling.textContent;
    const cvvTitle = 'CVV:';
    theValidator(cvvTitle, cvvRegex, cvvError, newCvvEl, cvvInput, cvvLabel);
}


// Combine name, email, card num, zip code, and cvv to all use this 1 function (since they are very similar to each other)
const theValidator = (thingTitle, thingRegex, thingError, newThingEl, thingInput, thingLabel) => {
    thingRegex;
    thingError;
    newThingEl = thingInput.previousElementSibling.textContent;
    
    // if input matches with regex, add the purple 'valid' border
    if (thingRegex.test(thingInput.value)) {
        thingInput.style.border = '2px solid purple';
        if (newThingEl === thingError) {
          // also delete error message/red 'error' border if it exists
          thingInput.previousElementSibling.remove();
        }
    } else {
        // when THING is not valid, add red border and red error message label
        thingInput.style.border = '2px solid red';
            
            if (newThingEl === thingTitle) {
              const thingLabel = document.createElement('label');
              thingLabel.style.color = 'red';
              thingLabel.textContent = thingError;
              // make sure this label is inserted above the input but below the 'THING' label
              thingInput.parentNode.insertBefore(thingLabel, thingInput);
            }
            
        // push the error message to the error messages array
        // this will keep track of erors on page and be used later
        errorMsgs.push(newThingEl);
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
    // empties array so form can go through
    errorMsgs = [];
    e.preventDefault();
    // call above functions to validate each relevant field
    isValidName();
    isValidEmail();
    activitiesValidation();
    
    // ONLY validate cc-num, zip code, cvv IF credit card payment method is selected 
    if (!creditCard.attributes.hidden) {
        creditCardValidation();
        zipCodeValidation();
        cvvValidation();
    }

//    creditCardValidation();
//    zipCodeValidation();
//    cvvValidation();
    
    // if there are no more error messages, refresh the page
    // this is because we can't actually submit the form
    if (errorMsgs.length ===0) {
        window.location.reload(true);
        return false;
    }
});
