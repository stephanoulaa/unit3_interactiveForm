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

====================================================
// BEFORE:
// define the input var (thingInput)
// define the new label var (thingLabel)
    
const theValidator = (thingRegex, thingError, newThingEl, thingInput, thingLabel) => {
    const thingRegex = //;
    const thingError = '';
    const newThingEl = thingInput.previousElementSibling.textContent;
    
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
        if (newThingEl === 'THING:') {
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








