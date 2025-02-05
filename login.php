<?php
include 'db.php'; // Include database connection

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, trim($_POST['username']));
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $response['success'] = false;
        $response['message'] = "All fields are required.";
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $response['success'] = true;
            $response['message'] = "Login successful!";
        } else {
            $response['success'] = false;
            $response['message'] = "Incorrect password.";
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Username does not exist.";
    }

    echo json_encode($response);
}

$conn->close();
?>
