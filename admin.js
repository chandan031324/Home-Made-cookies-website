
const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];


function loadAdminProducts() {
    const productContainer = document.getElementById("admin-products");

    if (adminProducts.length === 0) {
        productContainer.innerHTML = "<p>No products available.</p>";
        return;
    }

    productContainer.innerHTML = "";
    adminProducts.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("admin-product");
        div.innerHTML = `
            <h4>${product.name} - $${product.price}</h4>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productContainer.appendChild(div);
    });
}


function addProduct() {
    const name = prompt("Enter product name:");
    const price = prompt("Enter product price:");
    const img = prompt("Enter image URL:");

    if (name && price && img) {
        adminProducts.push({ name, price, img });
        localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
        alert("Product added successfully!");
        loadAdminProducts();
    } else {
        alert("Please fill in all fields!");
    }
}


function editProduct(index) {
    const product = adminProducts[index];
    const newName = prompt("Edit product name:", product.name);
    const newPrice = prompt("Edit product price:", product.price);
    const newImg = prompt("Edit image URL:", product.img);

    if (newName && newPrice && newImg) {
        adminProducts[index] = { name: newName, price: newPrice, img: newImg };
        localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
        alert("Product updated successfully!");
        loadAdminProducts();
    }
}


function deleteProduct(index) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
        adminProducts.splice(index, 1);
        localStorage.setItem("adminProducts", JSON.stringify(adminProducts));
        alert("Product deleted successfully!");
        loadAdminProducts();
    }
}

document.addEventListener("DOMContentLoaded", loadAdminProducts);
