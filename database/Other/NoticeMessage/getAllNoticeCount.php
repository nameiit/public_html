<?php
include('../../dbConnection.php');

$sql = "SELECT count(*) as count
        FROM NoticeBoard n
        JOIN UserAccount u
        ON n.edited_by = u.user_id
        WHERE n.category <> 'MCO'
        AND n.category <> 'receivedrequest'
        ORDER BY n.notice_id DESC";
$result = $conn->query($sql);

echo $result->fetch_assoc()['count'];

mysqli_close($conn);
?>
