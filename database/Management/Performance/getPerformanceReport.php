<?php
include('../../dbConnection.php');

$startDate = $_GET['start_date'];
$endDate = $_GET['end_date'];

$sql = "CALL sum_profit('monthly', '%', '$startDate', '$endDate')";
$result = $conn->query($sql);

$res = array();
$period = array();
$group_sum = array();
$indiv_sum = array();
$airticket_sum = array();
$total_sum = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $period[] = $row['time_period'];
        $group_sum[] = $row['groupSum'];
        $indiv_sum[] = $row['indivSum'];
        $airticket_sum[] = $row['airSum'];
        $total_sum[] = $row['totalSum'];
    }
}

array_push($res, $period);
array_push($res, $group_sum);
array_push($res, $indiv_sum);
array_push($res, $airticket_sum);
array_push($res, $total_sum);
echo json_encode($res);

mysqli_close($conn);
?>
