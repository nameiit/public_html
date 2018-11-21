<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$from_date = empty($_GET['from_date']) ? '%' : $_GET['from_date'];
$to_date = empty($_GET['to_date']) ? $_GET['today'] : $_GET['to_date'];
$revised_by = empty($_GET['revised_by']) ? '%' : $_GET['revised_by'];

$sql = "SELECT count(*) as ct
        FROM UpdateLog ul 
        JOIN UserAccount u 
        ON ul.revised_by = u.user_id
        WHERE transaction_id LIKE '$transaction_id'
        AND DATE_FORMAT(revised_time, '%Y-%m-%d') <= '$to_date'
        AND DATE_FORMAT(revised_time, '%Y-%m-%d') >= '$from_date'
        AND account_id LIKE '$revised_by'
        ORDER BY log_id DESC";
// echo $sql;
$result = $conn->query($sql);
$res = $result->fetch_assoc()['ct'];

echo $res;
?>