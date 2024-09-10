fetch('/login/submit-login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataObj)
})
.then(response => {
    if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.error || 'Unknown error');
        });
    }
    return response.json();
})
.then(data => {
    const errorDiv = document.getElementById('formErrors');

    // Clear previous errors
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';

    if (data.error) {
        // Display error message
        errorDiv.textContent = data.error;
        errorDiv.style.display = 'block';
    } else if (data.message) {
        // Handle successful login
        window.location.href = '/dashboard'; // Redirect to dashboard or home
    }
})
.catch(error => {
    // Handle fetch errors or parsing errors
    const errorDiv = document.getElementById('formErrors');
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'block';
    errorDiv.textContent = error.message || 'Unable to process the request. Please try again later.';
    console.error('Error:', error);
});