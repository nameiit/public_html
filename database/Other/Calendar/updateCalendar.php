<?php
include('../../dbConnection.php');

session_start();
$accid = $_SESSION['username'];

$title = $_POST['title'];
$content = $_POST['content'];
$importance = $_POST['important'];
$datetime = $_POST['datetime'];

$sql = "UPDATE
          ThingsToDo
        SET
          title = '$title',
          content = '$content',
          importance='$importance'
        WHERE
          user_id = (select user_id from UserAccount where account_id = '$accid')
        and create_time ='$datetime'";
$conn->query($sql);

mysqli_close($conn);
?>
