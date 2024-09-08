
export function clearErrors() {
    const existingErrorDiv = document.querySelector('.alert');
    if (existingErrorDiv) {
        existingErrorDiv.remove();
    }
}

export function displayError(message) {
    const form = document.getElementById('registrationForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}
