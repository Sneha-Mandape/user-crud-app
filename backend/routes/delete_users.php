<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/db.php";
include_once "../models/User.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["message" => "ID not provided"]);
    exit;
}

$db = (new Database())->connect();
$user = new User($db);

$user->id = $data->id;

if ($user->delete()) {
    echo json_encode(["message" => "User deleted successfully"]);
} else {
    echo json_encode(["message" => "User deletion failed"]);
}
