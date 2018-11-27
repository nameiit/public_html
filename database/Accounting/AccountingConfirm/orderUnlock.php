<?php
include('../../dbConnection.php');

session_start();
$account_id = $_SESSION["username"];
$fs_id_list = json_decode($_POST['fs_id_list']);

$sql = "SELECT lock_counter
        FROM PowerControl pc
        JOIN UserAccount ua
        ON pc.pc_id = ua.pc_id
        WHERE ua.account_id = '$account_id'";
$result = $conn->query($sql);
$access_permission = $result->fetch_assoc()['lock_counter'];
if ($access_permission == 'N') {
  for ($i = 0; $i < sizeof($fs_id_list); $i++) {
      $sql = "INSERT INTO AuditProcess (
          fs_id, status, cancel_request
      ) VALUES (
          $fs_id_list[$i], 'pending', 'lock'
      )";
      $conn->query($sql);
  }
  echo 'No access permission';
} else {
  for ($i = 0; $i < sizeof($fs_id_list); $i++) {
    $sql = "UPDATE FinanceStatus
            SET lock_status = 'N', clear_status = 'N'
            WHERE fs_id = $fs_id_list[$i]";
    $conn->query($sql);
  }
}

mysqli_close($conn);
 ?>
