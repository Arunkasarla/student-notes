<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root"; // Change as needed
$password = ""; // Change as needed
$dbname = "student_notes"; // Change as needed

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$roll = $data['roll'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash the password
$department = $data['department'];
$semester = $data['semester'];

// Check if email already exists
$checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$result = $checkEmail->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["message" => "Email already registered"]);
    $checkEmail->close();
    $conn->close();
    exit();
}

$checkEmail->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (name, roll, email, password, department, semester) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $roll, $email, $password, $department, $semester);

if ($stmt->execute()) {
    echo json_encode(["message" => "User registered"]);
} else {
    echo json_encode(["message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>