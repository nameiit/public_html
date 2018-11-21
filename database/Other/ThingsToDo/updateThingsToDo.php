<?php
include('../../dbConnection.php');

$title = $_POST['title'];
$content = $_POST['content'];
$ttoid = $_POST['ttid'];
$importance = $_POST['important'];
$sql = "UPDATE
          ThingsToDo
        SET
          title = '$title',
          content = '$content',
          importance='$importance'
        WHERE
          tto_id = '$ttoid'";
$result = $conn->query($sql);

mysqli_close($conn);
?>
