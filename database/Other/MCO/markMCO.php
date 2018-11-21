<?php
include('../../dbConnection.php');

$notice_id = $_POST['mco_id'];

$sql = "UPDATE McoInfo SET used = 'Y' WHERE notice_id = '$notice_id'";
$conn->query($sql);

mysqli_close($conn);
?>
