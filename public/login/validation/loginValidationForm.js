import { displayError, clearErrors } from "../../register/validation/registerErrorHandling.js";

function validateForm(event) {
    event.preventDefault();

    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    clearErrors();

    let hasError = false;

    if (email === '' || password === '') {
        displayError('Fill in all fields');
        hasError = true;
    }

    if (hasError) {
        return false; 
    }

    return true; 
}


document.getElementById('loginForm').onsubmit = validateForm;
