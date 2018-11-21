<?php
include('../../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$sql = "SELECT count(*) as count
        FROM ReceivedConfirmed r
        JOIN NoticeTarget nt
        ON r.notice_id = nt.notice_id
        WHERE nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
        AND r.process <> 'confirmed'";
$result = $conn->query($sql);

echo $result->fetch_assoc()['count'];

mysqli_close($conn);
?>
