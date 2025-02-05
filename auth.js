// Registration Form Submission
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Username Validation
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; // Alphanumeric, 3-20 characters
    if (!username || !usernameRegex.test(username)) {
        alert('Username must be alphanumeric and between 3-20 characters!');
        return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 letter, 1 number, 1 special char
    if (!password || !passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, include at least one letter, one number, and one special character!');
        return;
    }

    // Send registration data to the server
    fetch('../summerProjects/registers.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            if (data.success) {
                alert(data.message); // Success message
                window.location.href = 'login.html'; // Redirect to login
            } else {
                alert(data.message); // Error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        });
});

// Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Username Validation
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!username || !usernameRegex.test(username)) {
        alert('Please enter a valid username (alphanumeric, 3-20 characters)!');
        return;
    }

    // Password Validation
    if (!password) {
        alert('Password is required!');
        return;
    }

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) window.location.href = 'product.html';
        })
        .catch(error => alert('Error: ' + error));
});
