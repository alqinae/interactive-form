const name = document.querySelector('#name');

// Adding an event listener to run when the page is loaded. If it is loaded, then the name field will ne focused
document.addEventListener('DOMContentLoaded', () => name.focus());
const other_job_role = document.querySelector('#other-job-role');
// Hide the other job role field, and later we will show it if the user chose "other"
other_job_role.style.display = 'none';
const title = document.querySelector('#title');
title.addEventListener('change', (event) => {
    // If the user chose other
    if (event.target.value === 'other') {
        // The field will be shown
        other_job_role.style.display = 'inherit';
    } else {
        // otherwise, it will be hidden
        other_job_role.style.display = 'none';
    }
});
const color = document.querySelector('#color');
// Disabling the color drop menu
color.disabled = true;
const theme = document.querySelector('#design');
// Adding an event listener which will be triggered if the user chose any t-shirt design
theme.addEventListener('change', () => {
    const themeSelection = theme.value;
    // The color drop menu will be enabled
    color.disabled = false;
    // Changing the selected index to the default value
    color.selectedIndex = 0;
    const options = color.getElementsByTagName('option');
    // Loop through the colors
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        // If this color's design type is the same design chosen by the user
        if (themeSelection === option.getAttribute('data-theme')) {
            // This option will be shown
            option.style.display = 'inherit';
        } else {
            // Otherwise, it will be hidden
            option.style.display = 'none';
        }
    }
});
const activities = document.querySelector('#activities');
let total_cost = 0;
// If any activity is selected or deselected, this event listener will be triggered
activities.addEventListener('change', (event) => {
    const target = event.target;
    if (target.type === 'checkbox') {
        if (target.checked) {
            // If the event was triggered by selecting an activity, and the activity was not the main conference
            if (target.name !== 'all') {
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                // we will loop through all of the activities starting from index 1, and ignoring the first activity
                // because it doesn't have time nor having an attribute named "data-date-and-time
                for (let i = 1; i < checkboxes.length; i++) {
                    // if it has the same date and time as the chosen activity
                    if (checkboxes[i] !== target && target.getAttribute('data-day-and-time') === checkboxes[i].getAttribute('data-day-and-time')) {
                        // disable it so that the user can not book two conflicting activities
                        checkboxes[i].disabled = true;
                    }
                }
            }
            // After looping and disabling conflicting activities, add the selected activity cost to the total cost
            total_cost += parseInt(target.getAttribute('data-cost'));
        } else {
            // This else will be executed if the user deselected an activity
            if (target.name !== 'all') {
                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                // The following for loop will be the opposite of the previous loop, i.e. it will enable the conflicting activities
                for (let i = 1; i < checkboxes.length; i++) {
                    if (checkboxes[i] !== target && target.getAttribute('data-day-and-time') === checkboxes[i].getAttribute('data-day-and-time')) {
                        checkboxes[i].disabled = false;
                    }
                }
            }
            // After looping and enabling the conflicting activities, we subtract the cost of the deselected activity from the total cost
            total_cost -= parseInt(target.getAttribute('data-cost'));
        }
        // Display the updated total cost
        document.querySelector('#activities-cost').textContent = `Total: \$${total_cost}`;
    }
});
// This query selector will select all of input tags of type checkbox
const activitiesCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < activitiesCheckBoxes.length; i++) {
    // Adding an event listener that will be triggered if the user focused on an activity
    activitiesCheckBoxes[i].addEventListener('focus', (event) => {
        // Set the parent label of the checkbox to "focus"
        event.target.parentNode.className = 'focus';
    });
    // Adding an event listener that will be triggered if the user removed the focus from an activity
    activitiesCheckBoxes[i].addEventListener('blur', (event) => {
        // Remove the class name "focus" from the parent label
        event.target.parentNode.className = '';
    });
}

// Selecting credit card as a default payment method and show credit card details input fields
document.querySelector('#credit-card').style.display = 'inherit';
document.querySelector('#paypal').style.display = 'none';
document.querySelector('#bitcoin').style.display = 'none';
const payment = document.querySelector('#payment');
// Select the credit card as a default selection
payment.selectedIndex = 1;
payment.addEventListener('change', () => {
    switch (payment.value) {
        case 'credit-card':
            // If the user chose credit card, we will show credit card details fields and hide the others
            document.querySelector('#credit-card').style.display = 'inherit';
            document.querySelector('#paypal').style.display = 'none';
            document.querySelector('#bitcoin').style.display = 'none';
            break;
        case 'paypal':
            // If he chose paypal, we will show paypal and hide the others
            document.querySelector('#credit-card').style.display = 'none';
            document.querySelector('#paypal').style.display = 'inherit';
            document.querySelector('#bitcoin').style.display = 'none';
            break;
        case 'bitcoin':
            // If he chose bitcoin, we will show bitcoin and hide the others
            document.querySelector('#credit-card').style.display = 'none';
            document.querySelector('#paypal').style.display = 'none';
            document.querySelector('#bitcoin').style.display = 'inherit';
            break;
    }
});

function validateName() {
    // The if statement consists of two parts with an "or" between them
    // The first part is checking if the user left the name field empty
    // The other part is checking if the user wrote only spaces
    if (/^$/.test(name.value) || /^\s+$/.test(name.value)) {
        // If one of the conditions applies, we will show an error message and return false
        document.querySelector('#name-hint').style.display = 'inherit';
        name.parentNode.className = 'not-valid';
        return false;
    } else {
        // Otherwise, we will hide the error message and return true
        document.querySelector('#name-hint').style.display = 'none';
        name.parentNode.className = 'valid';
        return true;
    }
}

const email = document.querySelector('#email');
function validateEmail() {
    // The email should be of this format: capital and small letters, numbers, dashes, dots or underscores.
    // Then, an "@" character. After that a domain name which consists of capital and small letters, numbers or dashes
    // Finally, the email should end with ".com"
    if (/^[a-zA-z0-9-._]+@[a-zA-z0-9-]+.com$/.test(email.value)) {
        // If the email is formatted well, we will hide the error message and return false
        document.querySelector('#email-hint').style.display = 'none';
        email.parentNode.className = 'valid';
        return true;
    } else if (/^$/.test(email.value) || /^\s+$/.test(email.value)) {
        document.querySelector('#email-hint').style.display = 'inherit';
        document.querySelector('#email-hint').innerText = 'You can not leave this field empty or consists of only whitespaces';
        email.parentNode.className = 'not-valid';
        return false;
    } else {
        // Otherwise, we will show the error message and return false
        document.querySelector('#email-hint').style.display = 'inherit';
        document.querySelector('#email-hint').innerText = 'You have to format the email correctly, i.e. name@example.com';
        email.parentNode.className = 'not-valid';
        return false;
    }
}

function validateActivities() {
    // The following if-statement checks if there is at least one checkbox selected
    if (document.querySelector('input[type="checkbox"]:checked')) {
        // If there is at least one checkbox selected, hide the error message and return true
        document.querySelector('#activities-hint').style.display = 'none';
        document.querySelector('#activities-hint').parentNode.className = 'activities valid';
        return true;
    } else {
        // Else, show the error message and return false
        document.querySelector('#activities-hint').style.display = 'inherit';
        document.querySelector('#activities-hint').parentNode.className = 'activities not-valid';
        document.querySelector('#activities-hint').className = 'activities-hint hint';
        return false;
    }
}

function validateCreditCard() {
    // Assume that the payment fields are valid
    let valid = true;
    // If the user chose "credit card"
    if (payment.value === 'credit-card') {
        // We will check whether he filled the credit card number field with a 13 to 16 numbers
        if (!/^\d{13,16}$/.test(document.querySelector('#cc-num').value)) {
            // If this pattern is not matched, display an error message and set valid to false
            document.querySelector('#cc-hint').style.display = 'inherit';
            document.querySelector('#cc-num').parentNode.className = 'not-valid';
            valid = false;
        } else {
            // Otherwise hide the error message
            document.querySelector('#cc-hint').style.display = 'none';
            document.querySelector('#cc-num').parentNode.className = 'valid';
        }

        // We will check if the user entered 5 numbers for the zip code
        if (!/^\d{5}$/.test(document.querySelector('#zip').value)) {
            // If this pattern is not matched, display an error message and set valid to false
            document.querySelector('#zip-hint').style.display = 'inherit';
            document.querySelector('#zip-hint').parentNode.className = 'not-valid';
            valid = false;
        } else {
            // Otherwise, hide the error message
            document.querySelector('#zip-hint').style.display = 'none';
            document.querySelector('#zip-hint').parentNode.className = 'valid';
        }

        // Checking that the user has entered three digits for the cvv
        if (!/^\d{3}$/.test(document.querySelector('#cvv').value)) {
            // If this pattern is not matched, display an error message and set valid to false
            document.querySelector('#cvv-hint').style.display = 'inherit';
            document.querySelector('#cvv-hint').parentNode.className = 'not-valid';
            valid = false;
        } else {
            // Otherwise, hide the error message
            document.querySelector('#cvv-hint').style.display = 'none';
            document.querySelector('#cvv-hint').parentNode.className = 'not-valid';
        }
    }
    // Return "valid" which will be true if all of the tests passed. Or, false if one or more is/are not passed
    return valid;
}

const form = document.querySelector('form');
// Adding an event listener which will be triggered when the form is submitted
form.addEventListener('submit', (event) => {
    const nameValid = validateName();
    const emailValid = validateEmail();
    const activitiesValid = validateActivities();
    const creditCardValid = validateCreditCard();

    // Checking that all of the fields are valid
    if (!(nameValid && emailValid && activitiesValid && creditCardValid)) {
        // If one or more is/are not valid, prevent the form from being submitted
        event.preventDefault();
    }
    // We don't have an else because we will let the form submit if everything is valid
});

// Adding a "keyup" event listener for the name field to achieve real time form validation
name.addEventListener('keyup', () => {
   validateName();
});

// Adding a "keyup" event listener for the email field to achieve real time form validation
email.addEventListener('keyup', () => {
   validateEmail();
});