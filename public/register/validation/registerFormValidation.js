
import { displayError, clearErrors } from './registerErrorHandling';

export async function validateForm(event) {
    event.preventDefault();

    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    clearErrors();

    let hasError = false;

    if (email === '' || password === '' || repeatPassword === '') {
        displayError('Fill in all values');
        hasError = true;
    }

    if (password !== repeatPassword) {
        displayError('Passwords do not match');
        hasError = true;
    }

    if (!hasError) {
        try {
            const response = await fetch('/register/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    displayError(data.error);
                    hasError = true;
                }
            } else {
                displayError('Server responded with an error');
                hasError = true;
            }
        } catch (error) {
            displayError('Unable to check email availability. Please try again later.');
            hasError = true;
        }
    }

    if (hasError) {
        return false;
    }

    // If no errors, proceed with registration
    await registerUser(formData);
}