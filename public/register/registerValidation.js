async function validateForm(event) {
    event.preventDefault();

    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    clearError();

    let hasError = false;

    if (!email || !password || !repeatPassword){
        displayError('Fill in all values');
        hasError = true;
    }

    if (password !== repeatPassword){
        displayError('Password do not match');
        hasError = true;
    }

    if (!hasError){
        try{
            const response = await fetch('/register/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if(response.ok) {
                const data = await response.json();
                if (data.error) {
                    displayError(data.error);
                    hasError = true;
                } else if (data.success) {
                    await registerUser(formData);
                }
            } else {
                displayError('Server responded with an error');
                hasError = ture;
            }
        } catch (error){
            console.error('Error checking email:', error);
            displayError('Unable to check email availability. Please try again alter.');
            hasError = ture;
        }
    }
}

function clearError() {
    const existingErrorDiv = document.querySelector('.alert');
    if(existingErrorDiv) {
        existingErrorDiv.remove();
    }
}

function displayError(message) {
    const form = document.getElementById('registrationForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}
