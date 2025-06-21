    <?php
    // CORS headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: 'X-Requested-With,content-type'");
    header("Access-Control-Allow-Methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'");

    // Respond to preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Now validate allowed method (POST for create, PUT for update)
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["message" => "Invalid request method"]);
        exit;
    }

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
