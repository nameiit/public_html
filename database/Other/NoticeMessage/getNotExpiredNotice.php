<?php
include('../../dbConnection.php');

$offset = $_GET['offset'];

$sql = "SELECT n.notice_id, n.category, u.account_id AS edited_by, n.content
        FROM NoticeBoard n
        JOIN UserAccount u
        ON n.edited_by = u.user_id
        WHERE n.valid_until >= CURRENT_DATE
        AND n.category <> 'MCO'
        AND n.category <> 'receivedrequest'
        ORDER BY n.notice_id DESC
        LIMIT 10 OFFSET $offset";
$result = $conn->query($sql);

$res = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $res[] = $row;
    }
}

echo json_encode($res);

mysqli_close($conn);
?>
