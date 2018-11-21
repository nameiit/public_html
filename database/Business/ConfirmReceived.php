<?php
include('../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$transactionId = $_POST['transaction_id'];
$account_id = $_POST['account_id'];

$sql = "INSERT INTO NoticeBoard (valid_until, edited_by, category) 
        VALUES (
                current_date + interval 1 year, 
                (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'), 
                'receivedrequest')";
$conn->query($sql);

$sql = "SELECT notice_id 
        FROM NoticeBoard 
        WHERE edited_by = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username') 
        ORDER BY notice_id DESC 
        LIMIT 1";
$result = $conn->query($sql);
$notice_id = $result->fetch_assoc()['notice_id'];

$sql = "INSERT INTO NoticeTarget (notice_id, target_id) 
        VALUES (
                '$notice_id', 
                (SELECT user_id FROM UserAccount WHERE account_id = '$account_id'))";
$conn->query($sql);

$sql = "INSERT INTO ReceivedConfirmed (
            transaction_id, 
            sent_by, 
            process, 
            request_time, 
            notice_id) 
        VALUES (
            '$transactionId', 
            (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'), 
            'pending', 
            current_timestamp, 
            '$notice_id')";
$conn->query($sql);

mysqli_close($conn);
?>
