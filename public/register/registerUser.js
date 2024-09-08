
export async function registerUser(formData) {
    try {
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        const response = await fetch('/register/submit-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.error) {
                displayError(data.error);
            } else if (data.message) {
                window.location.href = '/dashboard';
            }
        } else {
            displayError('Registration failed');
        }
    } catch (error) {
        displayError('Network error during registration');
        console.error('Error during registration:', error);
    }
}
