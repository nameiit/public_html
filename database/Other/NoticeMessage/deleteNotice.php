<?php
include('../../dbConnection.php');

$notice_id = $_POST['notice_id'];
$sql = "DELETE FROM NoticeTarget WHERE notice_id = '$notice_id'";
$result = $conn->query($sql);

// $sql = "DELETE FROM NoticeBoard WHERE notice_id = '$notice_id'";
// $result = $conn->query($sql);

mysqli_close($conn);
?>
