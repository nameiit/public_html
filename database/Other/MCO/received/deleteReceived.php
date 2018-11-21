<?php
include('../../../dbConnection.php');

$id = json_decode($_POST['id']);

for ($i = 0; $i < sizeof($id); $i++) {
  $sql = "DELETE FROM ReceivedConfirmed WHERE notice_id = $id[$i]";
  $conn->query($sql);

  $sql = "DELETE FROM NoticeTarget WHERE notice_id = $id[$i]";
  $conn->query($sql);

  $sql = "DELETE FROM NoticeBoard WHERE notice_id = $id[$i]";
  $conn->query($sql);  
}

mysqli_close($conn);
?>
