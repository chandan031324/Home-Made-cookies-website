// Update the cart badge when the page is loaded or items are added/removed
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBadge = document.getElementById("cart-badge");
    
    // Display the number of items in the cart (or 0 if empty)
    cartBadge.textContent = cart.length > 0 ? cart.length : '';
}

// Check if user is logged in and update the user menu accordingly
function checkUserAuth() {
    const userMenu = document.getElementById("user-menu");
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    // If user is logged in, show their name in the user menu
    if (userMenu && loggedInUser) {
        userMenu.innerHTML = `Hello, ${loggedInUser.name} <a href="logout.html">Logout</a>`;
    } else {
        if (userMenu) {
            userMenu.innerHTML = '<a href="login.html">Login</a> <a href="register.html">Register</a>';
        }
    }
}

// Load cart items when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    checkUserAuth();
});

// You can call this function when an item is added to the cart
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); // Update the cart badge when a new item is added
}

// Call this function when an item is removed from the cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== itemId); // Remove the item by id
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); // Update the cart badge after removal
}

// To call when the user logs out
function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "index.html"; // Redirect to the homepage after logout
}

