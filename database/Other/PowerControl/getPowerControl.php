<?php
include('../../dbConnection.php');

session_start();
$group_name = $_SESSION["group_name"];

if ($group_name != 'superad') {
  echo "No access permission!";
} else {
  $account_id = $_GET['account_id'];

  $sql = "SELECT
            pc.clear_power, pc.lock_power, pc.paid_power, pc.finish_power,
            pc.clear_counter, pc.lock_counter, pc.paid_counter, pc.finish_counter
          FROM PowerControl pc
          JOIN UserAccount ua
          ON pc.pc_id = ua.pc_id
          WHERE ua.account_id = '$account_id'";
  $result = $conn->query($sql);

  $res = array();
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          $res[] = $row;
      }
  }
  echo json_encode($res);
}

mysqli_close($conn);
?>
