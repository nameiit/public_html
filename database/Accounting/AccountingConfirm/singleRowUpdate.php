<?php
include('../../dbConnection.php');

$fs_id = $_POST['fs_id'];
$invoice = $_POST['invoice'];
$debt = $_POST['debt'];
$receive = $_POST['receive'];
$selling_price = $_POST['selling_price'];
$check_no = $_POST['check_no'];

//更新一行
// $sql = "UPDATE ......";
// $conn->query($sql);

if (empty($receive)) {
  $sql = "UPDATE FinanceStatus SET
            debt = $debt,
            debt_raw = $debt,
            total_profit = -$debt,
            lock_status = 'N',
            paid_status = 'Y',
            clear_status = 'N',
            finish_status = 'N',
            debt_cleared = 0
          WHERE fs_id = $fs_id";
  $conn->query($sql);
} else {
  $sql = "UPDATE FinanceStatus
            SET debt = $debt,
            received = $receive,
            received_raw = $receive,
            debt_raw = $debt,
            total_profit = $receive - $debt,
             "
}


mysqli_close($conn);
 ?>
