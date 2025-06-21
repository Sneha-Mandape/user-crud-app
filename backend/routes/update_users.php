<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: 'X-Requested-With,content-type'");
header("Access-Control-Allow-Methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Now validate allowed method (POST for create, PUT for update)
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    echo json_encode(["message" => "Invalid request method"]);
    exit;
}

include_once "../config/db.php";
include_once "../models/User.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !isset($data->name) || !isset($data->email) || !isset($data->dob)) {
    echo json_encode(["message" => "Incomplete data"]);
    exit;
}

$db = (new Database())->connect();
$user = new User($db);

$user->id = $data->id;
$user->name = $data->name;
$user->email = $data->email;
$user->dob = $data->dob;

if ($user->update()) {
    echo json_encode(["message" => "User updated successfully"]);
} else {
    echo json_encode(["message" => "User update failed"]);
}
