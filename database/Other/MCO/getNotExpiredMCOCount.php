<?php
include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$sql = "SELECT count(*) as count
        FROM NoticeBoard n
        JOIN NoticeTarget nt
        ON n.notice_id = nt.notice_id
        JOIN UserAccount u
        ON n.edited_by = u.user_id
        WHERE valid_until >= CURRENT_DATE
        AND category = 'MCO'
        AND nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
        ORDER BY n.notice_id DESC";
$result = $conn->query($sql);

echo $result->fetch_assoc()['count'];

mysqli_close($conn);
?>
