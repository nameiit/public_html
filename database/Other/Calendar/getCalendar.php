<?php
include('../../dbConnection.php');

session_start();
$accid = $_SESSION['username'];

$sql = "SELECT
            tto_id,
            title,
            content,
            importance,
            create_time
        FROM ThingsToDo
        WHERE user_id = (SELECT user_id FROM UserAccount WHERE account_id = '$accid')
        AND TYPE ='calendar'
        ORDER BY tto_id DESC
        LIMIT 30";

$result = $conn->query($sql);

$res = array();
$tto_id = array();
$title = array();
$content = array();
$importance = array();
$createtime = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tto_id[] = $row['tto_id'];
        $title[] = $row['title'];
        $content[] = $row['content'];
        $importance[] = $row['importance'];
        $createtime[] = $row['create_time'];

    }
}

array_push($res, $tto_id);
array_push($res, $title);
array_push($res, $content);
array_push($res, $importance);
array_push($res, $createtime);
echo json_encode($res);

mysqli_close($conn);
?>
