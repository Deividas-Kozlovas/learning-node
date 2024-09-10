import { displayError, clearErrors } from "../../register/validation/registerErrorHandling.js";
import { submitForm } from '../loginUser.js';

function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('loginForm');
    const formData = new FormData(form); // Create FormData object
    const email = formData.get('email');
    const password = formData.get('password');

    clearErrors(); // Clear any previous errors

    let hasError = false;

    // Basic validation
    if (email === '' || password === '') {
        displayError('Fill in all fields');
        hasError = true;
    }

    if (hasError) {
        return false; // Prevent form submission if there are validation errors
    }

    // Call submitForm to handle AJAX submission
    submitForm(formData); // Pass FormData object directly

    return false; // Prevent the default form submission
}

// Attach the validateForm function to the form's onsubmit event
document.getElementById('loginForm').onsubmit = validateForm;
