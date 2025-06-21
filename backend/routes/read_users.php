<?php
include_once "../config/db.php";
include_once "../models/User.php";

$db = (new Database())->connect();
$user = new User($db);

$result = $user->read();
$num = $result->rowCount();

if ($num > 0) {
    $users_arr = [];

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $users_arr[] = [
            "id" => $id,
            "name" => $name,
            "email" => $email,
            "dob" => $dob
        ];
    }

    echo json_encode($users_arr);
} else {
    echo json_encode(["message" => "No users found"]);
}
