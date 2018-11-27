<?php
include('../../dbConnection.php');

session_start();
$account_id = $_SESSION["username"];
$fs_id_list = json_decode($_POST['fs_id_list']);

$sql = "SELECT finish_power
        FROM PowerControl pc
        JOIN UserAccount ua
        ON pc.pc_id = ua.pc_id
        WHERE ua.account_id = '$account_id'";
$result = $conn->query($sql);
$access_permission = $result->fetch_assoc()['finish_power'];

if ($access_permission == 'N') {
  echo 'No access permission';
} else {
  for ($i = 0; $i < sizeof($fs_id_list); $i++) {
    $sql = "UPDATE FinanceStatus
            SET finish_status = 'Y'
            WHERE fs_id = $fs_id_list[$i]";
    $conn->query($sql);
  }
}

mysqli_close($conn);
 ?>
