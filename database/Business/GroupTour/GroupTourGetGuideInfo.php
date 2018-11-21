<?php
include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];

$sql = "SELECT concat(g.fname, ' ', g.lname) AS guide_name, g.phone, gw.write_off, gw.write_off_currency
        FROM TouristGuide g
        JOIN GroupTourGuideDetails gw ON g.guide_id = gw.guide_id
        JOIN Transactions t ON t.group_tour_id = gw.group_tour_id
        WHERE t.transaction_id = '$transactionId'";
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
