<?php
include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$account_id = $_POST['user_id'];
$mco_expired_time = $_POST['mco_expired_time'];
$card_holder = $_POST['card_holder'];
$card_number = $_POST['card_number'];
$expired_date = $_POST['expired_date'];
$security_code = $_POST['security_code'];
$charging_amount = $_POST['charging_amount'];
$currency = $_POST['currency'];
$billing_phone = $_POST['billing_phone'];
$billing_address = $_POST['billing_address'];
$note = $_POST['note'];

$sql = "INSERT INTO NoticeBoard (
            valid_until,
            edited_by,
            content,
            gotop,
            category
        ) VALUES (
            current_timestamp + interval $mco_expired_time hour,
            (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'),
            NULL,
            'N',
            'MCO'
        )";
$result = $conn->query($sql);

$sql = "SELECT max(notice_id) as notice_id FROM NoticeBoard WHERE edited_by = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')";
$result = $conn->query($sql);
$notice_id = $result->fetch_assoc()['notice_id'];

$sql = "INSERT INTO NoticeTarget (notice_id, target_id) VALUES ($notice_id, (SELECT user_id FROM UserAccount WHERE account_id = '$account_id'))";
$conn->query($sql);
if ($account_id != $login_username) {
  $sql = "INSERT INTO NoticeTarget (notice_id, target_id) VALUES ($notice_id, (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'))";
  $conn->query($sql);
}


$sql = "INSERT INTO McoInfo (
          cardholder,
          card_number,
          exp_date,
          security_code,
          billing_address,
          phone_issuing_bank,
          charging_amount_currency,
          charging_amount,
          notice_id,
          create_time,
          note,
          used
        ) VALUES (
          '$card_holder',
          '$card_number',
          '$expired_date',
          '$security_code',
          '$billing_address',
          '$billing_phone',
          '$currency',
          $charging_amount,
          $notice_id,
          current_timestamp,
          '$note',
          'N'
        )";
$conn->query($sql);


mysqli_close($conn);
?>
