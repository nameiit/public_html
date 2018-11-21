<?php
include('../../dbConnection.php');

session_start();
$accid = $_SESSION['username'];

$sql = "SELECT
            tto_id,
            title,
            content,
            importance
        FROM ThingsToDo
        WHERE user_id = (
            SELECT user_id
            FROM UserAccount
            WHERE account_id = '$accid')
        AND TYPE ='notice'
        ORDER BY tto_id DESC
        LIMIT 10";

$result = $conn->query($sql);

$res = array();
$tto_id = array();
$title = array();
$content = array();
$importance = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tto_id[] = $row['tto_id'];
        $title[] = $row['title'];
        $content[] = $row['content'];
        $importance[] = $row['importance'];
    }
}

array_push($res, $tto_id);
array_push($res, $title);
array_push($res, $content);
array_push($res, $importance);
echo json_encode($res);

mysqli_close($conn);
?>
