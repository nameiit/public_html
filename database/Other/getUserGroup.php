<?php
include('../dbConnection.php');

session_start();
$group_name = $_SESSION["group_name"];

if ($group_name != 'superad') {
  echo "No access permission!";
}

mysqli_close($conn);
?>
