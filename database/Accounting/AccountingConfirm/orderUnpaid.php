<?php
include('../../dbConnection.php');

session_start();
$account_id = $_SESSION["username"];
$transaction_id_list = json_decode($_POST['transaction_id_list']);

$sql = "SELECT paid_counter
        FROM PowerControl pc
        JOIN UserAccount ua
        ON pc.pc_id = ua.pc_id
        WHERE ua.account_id = '$account_id'";
$result = $conn->query($sql);
$access_permission = $result->fetch_assoc()['paid_counter'];
if ($access_permission == 'N') {
  echo 'No access permission';
} else {
  for ($i = 0; $i < sizeof($transaction_id_list); $i++) {
    $sql = "UPDATE FinanceStatus
            SET paid_status = 'N'
            WHERE transaction_id = $transaction_id_list[$i]
            AND received <> 'CC'";
    $conn->query($sql);

    $sql = "UPDATE FinanceStatus
            SET finish_status = 'N'
            WHERE transaction_id = $transaction_id_list[$i]";
    $conn->query($sql);
  }
}

mysqli_close($conn);
 ?>
