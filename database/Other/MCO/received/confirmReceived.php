<?php
include('../../../dbConnection.php');

$id = json_decode($_POST['id']);

for ($i = 0; $i < sizeof($id); $i++) {
  $sql = "UPDATE ReceivedConfirmed SET process = 'confirmed' WHERE notice_id = $id[$i]";
  $conn->query($sql);

  $sql = "UPDATE NoticeBoard SET valid_until = current_date - interval 1 day WHERE notice_id = $id[$i]";
  $conn->query($sql);
}

mysqli_close($conn);
?>
