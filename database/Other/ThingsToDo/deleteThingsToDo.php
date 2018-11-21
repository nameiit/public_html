<?php
include('../../dbConnection.php');

$ttoid = $_POST['id'];

$sql = "DELETE FROM ThingsToDo WHERE tto_id = '$ttoid'";
echo $sql;
$result = $conn->query($sql);

mysqli_close($conn);
?>
