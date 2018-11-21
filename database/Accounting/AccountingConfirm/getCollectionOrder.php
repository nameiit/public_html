<?php
include('../../dbConnection.php');

$transaction_id = $_GET['collection_id'];

$sql = "SELECT
          fs.transaction_id,
          fs.invoice,
          fs.total_profit,
          concat(fs.clear_status, '|', debt) AS debt,
          REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC') AS received,
          fs.selling_price,
          fs.create_time,
          fs.depart_date,
          fs.arrival_date,
          fs.lock_status,
          fs.finish_status,
          fs.following_id_collection,
          t.type,
          a.payment_type,
          fs.check_no
        FROM FinanceStatus fs
        JOIN Transactions t ON fs.transaction_id = t.transaction_id
        JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
        JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
        JOIN Customer c ON a.customer_id = c.customer_id
        JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
        WHERE fs.transaction_id LIKE '$transaction_id'";
// echo $sql;
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
