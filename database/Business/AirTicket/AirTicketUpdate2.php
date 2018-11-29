
<?php include('../../dbConnection.php');



$sql = "SET foreign_key_checks = 0";
$conn->query($sql);










$sql = "SET foreign_key_checks = 1";
$conn->query($sql);

mysqli_close($conn);
?>
