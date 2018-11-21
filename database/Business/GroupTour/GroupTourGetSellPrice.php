<?php
include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];

$sql = "SELECT g.received, g.received_currency, g.payment_type, g.payment_amount, g.commission_fee
        FROM GroupTourReceived g
        JOIN Transactions t ON t.group_tour_id = g.group_tour_id
        WHERE t.transaction_id = $transactionId";
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
