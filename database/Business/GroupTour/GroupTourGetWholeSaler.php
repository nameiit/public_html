<?php include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];
$sql = "SELECT w.wholesaler_code
        FROM Wholesaler w
        JOIN WholesalerCollection wc
        ON w.wholesaler_id = wc.wholesaler_id
        JOIN Transactions t
        ON t.group_tour_id = wc.group_tour_id
        WHERE t.transaction_id = $transactionId";
$result = $conn->query($sql);

$res = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $res[] = $row['wholesaler_code'];
    }
}
echo json_encode($res);

mysqli_close($conn);
?>
