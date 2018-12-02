<?php
include('../../dbConnection.php');


session_start();
$account_id = $_SESSION["username"];


$fs_id = $_POST['fs_id'];
$invoice = $_POST['invoice'];
$debt = $_POST['debt'];
$receive = $_POST['receive'];
$selling_price = $_POST['selling_price'];
$check_no = $_POST['check_no'];

$sql = "SELECT transaction_id FROM FinanceStatus WHERE fs_id = $fs_id";
$result = $conn->query($sql);
$transaction_id = $result->fetch_assoc()['transaction_id'];

if (empty($_POST['receive'])) {
  $sql = "SELECT debt_raw FROM FinanceStatus WHERE fs_id = $fs_id";
  $result = $conn->query($sql);
  $debt_raw_old = $result->fetch_assoc()['debt_raw'];
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
  IF ($debt_raw_old != $debt) {
    $sql = "INSERT INTO UpdateLog (
      name,
      value_before,
      value_after,
      value_difference,
      currency_before,
      currency_after,
      revised_by,
      revised_time,
      transaction_id
      ) SELECT
      'Debt',
      $debt_raw_old,
      $debt,
      $debt - $debt_raw_old,
      'USD',
      'USD',
      ua.user_id,
      current_timestamp,
      $transaction_id
      FROM UserAccount ua WHERE ua.account_id = '$account_id'";
      $conn->query($sql);
  }
} else {
  $query = "SELECT debt_raw, received_raw, selling_price FROM FinanceStatus
            WHERE fs_id = $fs_id";
  $result = $conn->query($query);
  $temp = $result->fetch_assoc();
  $debt_raw_old = $temp['debt_raw'];
  $received_raw_old = $temp['received_raw'];
  $selling_price_raw_old = $temp['selling_price'];
  $sql = "UPDATE FinanceStatus
            SET debt = $debt,
            received = $receive,
            received_raw = $receive,
            debt_raw = $debt,
            debt_cleared = 0,
            received_finished = 0,
            total_profit = $receive - $debt,
            lock_status = 'N',
            paid_status = 'N',
            clear_status = 'N',
            finish_status = 'N'
          WHERE fs_id = $fs_id";
  $conn->query($sql);
  if ($debt_raw_old != $debt) {
    $sql = "INSERT INTO UpdateLog (
            name,
            value_before,
            value_after,
            value_difference,
            currency_before,
            currency_after,
            revised_by,
            revised_time,
            transaction_id
            ) SELECT
            'Debt',
            $debt_raw_old,
            $debt,
            $debt - $debt_raw_old,
            'USD',
            'USD',
            ua.user_id,
            current_timestamp,
            $transaction_id
            FROM UserAccount ua WHERE ua.account_id = '$account_id'";
    $conn->query($sql);
  }
  if ($received_raw_old != $receive) {
    $sql = "INSERT INTO UpdateLog (
            name,
            value_before,
            value_after,
            value_difference,
            currency_before,
            currency_after,
            revised_by,
            revised_time,
            transaction_id
            ) SELECT
            '应收款',
            $received_raw_old,
            $receive,
            $receive - $received_raw_old,
            'USD',
            'USD',
            ua.user_id,
            current_timestamp,
            $transaction_id
            FROM UserAccount ua WHERE ua.account_id = '$account_id'";
    $conn->query($sql);
  }
  if ($selling_raw_old != $selling_price) {
    $sql = "INSERT INTO UpdateLog (
            name,
            value_before,
            value_after,
            value_difference,
            currency_before,
            currency_after,
            revised_by,
            revised_time,
            transaction_id
            ) SELECT
            '卖价',
            $selling_raw_old,
            $selling_price,
            $selling_price - $selling_raw_old,
            'USD',
            'USD',
            ua.user_id,
            current_timestamp,
            $transaction_id
            FROM UserAccount ua WHERE ua.account_id = '$account_id'";
    $conn->query($sql);
  }
}

mysqli_close($conn);
 ?>
