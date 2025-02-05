<?php
include 'db.php';
header('Content-Type: application/json'); // Ensure JSON response

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Retrieve and sanitize user input
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $address = htmlspecialchars($_POST['address'], ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');

    // Check if any field is empty
    if (empty($name) || empty($address) || empty($email) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Database connection (MySQL)
    $servername = "localhost";  // Your database host
    $username = "root";         // Your database username
    $password = "";             // Your database password
    $dbname = "baked_goods_db";    // Your database name

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // SQL query to insert order details into the database
        $stmt = $conn->prepare("INSERT INTO orders (customer_name, shipping_address, email, phone) VALUES (:customer_name, :shipping_address, :email, :phone)");
        $stmt->bindParam(':customer_name', $name);
        $stmt->bindParam(':shipping_address', $address);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Order placed successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to place the order.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
