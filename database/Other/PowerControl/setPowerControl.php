<?php
include('../../dbConnection.php');

$account_id = $_POST['account_id'];
$power_group = $_POST['power_group'];
$power_control = $_POST['power_control'];

$sql = "SELECT pc_id FROM UserAccount WHERE account_id = '$account_id'";
$result = $conn->query($sql);
$pc_id = $result->fetch_assoc()['pc_id'];

$sql = "UPDATE PowerControl SET " . $power_group . " = '" . $power_control . "' WHERE pc_id = '$pc_id'";
$conn->query($sql);

mysqli_close($conn);
?>
