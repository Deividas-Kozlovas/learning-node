// Display error messages
export function displayError(message) {
    const errorContainer = document.getElementById('formErrors');
    if (errorContainer) {
        errorContainer.innerText = message;
        errorContainer.style.display = 'block'; // Show the error container
    }
}

// Clear error messages
export function clearErrors() {
    const errorContainer = document.getElementById('formErrors');
    if (errorContainer) {
        errorContainer.innerText = ''; // Clear the content
        errorContainer.style.display = 'none'; // Hide the error container
    }
}
