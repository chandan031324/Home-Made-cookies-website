<?php
$host = "localhost"; // Replace with your database host
$user = "root";      // Replace with your database username
$password = "";      // Replace with your database password
$dbname = "baked_goods_db"; // Replace with your database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
