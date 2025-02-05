console.log("cart.js loaded successfully");

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    if (cartItems.length === 0) {
        document.getElementById("cart-items-container").innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total-price").textContent = "Total: $0.00";
        document.getElementById("checkout-button").disabled = true; // Disable checkout button
        return;
    }

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity; // Update total price
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <h4>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</h4>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    // Update and display the total price
    document.getElementById("total-price").textContent = `Total: $${totalPrice.toFixed(2)}`;
    document.getElementById("checkout-button").disabled = false; // Enable checkout button
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from cart.");
    loadCartItems();
}

function proceedToCheckout() {
    console.log("Proceed to Checkout button clicked."); // Debugging log

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }

    console.log("Redirecting to the checkout page..."); // Debugging log
    window.location.href = "order.html"; // Redirect to checkout
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    document.getElementById("checkout-button").addEventListener("click", proceedToCheckout);
});
