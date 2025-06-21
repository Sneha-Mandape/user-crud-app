<?php
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
