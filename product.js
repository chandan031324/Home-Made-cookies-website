
const products = [ //Defines an array products containing objects representing each product.
    { id: 1, name: "Chocolate Chip Cookies", price: 5.99, img: "Assets/cookies1.jpg" },
    { id: 2, name: "Banana Bread", price: 7.99, img: "Assets/Banana Bread.jpg" },
    { id: 3, name: "Classic Cheesecake", price: 14.99, img: "Assets/cheese cake.jpg" },
    { id: 4, name: "Blueberry Muffins", price: 3.99, img: "Assets/blueberry.jpg" }
];

function addToCart(productId) {
    
    const product = products.find(item => item.id === productId);
    if (!product) return;


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
    
        existingProduct.quantity += 1; //If the product already exists in the cart, it increments the quantity property by 1.

    } else {
    
        cart.push({ ...product, quantity: 1 });// push add quntity 1
    }

    
    localStorage.setItem("cart", JSON.stringify(cart));

    
    alert(`${product.name} has been added to your cart!`);

    
    updateCartBadge();
}


function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
        cartBadge.textContent = cart.length; // Update the badge with the number of items in the cart
    }
}

// Call this function when the page loads to show the current cart count
document.addEventListener("DOMContentLoaded", updateCartBadge);
