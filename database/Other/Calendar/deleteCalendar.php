<?php
include('../../dbConnection.php');

session_start();
$accid = $_SESSION['username'];
$datetime = $_POST['datetime'];

$sql = "DELETE FROM
          ThingsToDo
        WHERE
          user_id = (SELECT user_id FROM UserAccount WHERE account_id = '$accid')
        AND create_time ='$datetime'";
$result = $conn->query($sql);

mysqli_close($conn);
?>
