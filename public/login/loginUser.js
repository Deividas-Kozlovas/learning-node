export async function submitForm(formData) {
    // Check if formData is correctly passed
    if (!(formData instanceof FormData)) {
        console.error('Invalid FormData object passed to submitForm');
        return;
    }

    // Convert FormData to a plain object
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    console.log('Form Data Object:', formDataObj); // Log the converted form data for debugging

    try {
        // Perform the POST request
        const response = await fetch('/login/submit-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj) // Send the object as JSON
        });

        if (!response.ok) {
            // Handle non-2xx HTTP responses
            const errorData = await response.json();
            console.error('Error response data:', errorData); // Log error data from response
            throw new Error(errorData.error || 'Unknown error');
        }

        // Handle successful response
        const data = await response.json();

        const errorDiv = document.getElementById('formErrors');

        // Clear previous errors
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'none';

        if (data.error) {
            console.error('Server error message:', data.error); // Log the server error message
            // Display error message from server
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        } else if (data.message) {
            console.log('Login successful:', data.message); // Log success message
            // Handle successful login
            window.location.href = '/dashboard'; // Redirect to dashboard or home
        }
    } catch (error) {
        // Handle fetch errors or parsing errors
        const errorDiv = document.getElementById('formErrors');
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'block';
        errorDiv.textContent = error.message || 'Unable to process the request. Please try again later.';
        console.error('Fetch error:', error); // Log fetch or parsing errors
    }
}