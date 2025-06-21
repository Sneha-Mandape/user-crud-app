<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once "../config/db.php";
include_once "../models/User.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->email) || !isset($data->password) || !isset($data->dob)) {
    echo json_encode(["message" => "Incomplete data"]);
    exit;
}


$db = (new Database())->connect();
$user = new User($db);

$user->name = $data->name;
$user->email = $data->email;
$user->password = $data->password;
$user->dob = $data->dob;

if ($user->create()) {
    echo json_encode(["message" => "User created successfully"]);
} else {
    echo json_encode(["message" => "User creation failed"]);
}
