function placeOrder() {
    // Get values from form fields (fixed input IDs)
    const name = document.getElementById('cust_name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Basic validation (check if any field is empty)
    if (!name || !address || !email || !phone) {
        alert("Please fill in all the fields.");
        return;
    }

    // Prepare data to send
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);

    // Send data to the server using Fetch API (POST request)
    fetch('order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Assume the server responds with JSON
    .then(data => {
        if (data.success) {
            alert('Order placed successfully!');
            localStorage.removeItem("cart"); // Clear the cart
            window.location.href = 'index.html';
        } else {
            alert('Failed to place order: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
