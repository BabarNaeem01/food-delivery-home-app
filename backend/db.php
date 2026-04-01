<?php
$connection = new mysqli("localhost", "root", "", "assignment3_app5");
if ($connection->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}
$connection->set_charset("utf8");
header("Content-Type: application/json");
?>
