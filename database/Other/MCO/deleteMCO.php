<?php
include('../../dbConnection.php');

$notice_id = $_POST['mco_id'];

$sql = "DELETE FROM NoticeTarget WHERE notice_id = '$notice_id'";
$conn->query($sql);

$sql = "DELETE FROM NoticeBoard WHERE notice_id = '$notice_id'";
$conn->query($sql);

$sql = "DELETE FROM McoInfo WHERE notice_id = '$notice_id'";
$conn->query($sql);

mysqli_close($conn);
?>
