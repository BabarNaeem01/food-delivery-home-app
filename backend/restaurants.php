<?php
require "db.php";
$result = $connection->query("SELECT id, name, cuisine, rating FROM restaurants ORDER BY rating DESC");
$restaurants = [];
while ($row = $result->fetch_assoc()) {
    $restaurants[] = $row;
}
echo json_encode($restaurants);
?>
