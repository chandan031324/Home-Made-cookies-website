<?php
include 'db.php'; // Include the database connection file

header('Content-Type: application/json'); // Ensure the response is JSON
$response = array(); // Initialize the response array

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect and sanitize inputs
    $username = mysqli_real_escape_string($conn, trim($_POST['username']));
    $email = mysqli_real_escape_string($conn, trim($_POST['email']));
    $password = trim($_POST['password']);

    // Validation
    if (empty($username) || empty($email) || empty($password)) {
        $response['success'] = false;
        $response['message'] = "All fields are required.";
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = "Invalid email format.";
        echo json_encode($response);
        exit;
    }

    if (strlen($password) < 6) {
        $response['success'] = false;
        $response['message'] = "Password must be at least 6 characters.";
        echo json_encode($response);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Use a prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param('ss', $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response['success'] = false;
        $response['message'] = "Username or email already exists.";
        echo json_encode($response);
        exit;
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Registration successful!";
    } else {
        $response['success'] = false;
        $response['message'] = "Error: " . $conn->error;
    }

    echo json_encode($response); // Return JSON response
    $stmt->close();
}

$conn->close();
?>
