<?php
include('../../dbConnection.php');

$transaction_id = $_GET['collection_id'];

$sql = "SELECT
          fs.fs_id,
          concat(fs.transaction_id, IFNULL(fs.ending, '')) AS transaction_id,
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
          a.payment_type,
          fs.check_no
        FROM FinanceStatus fs
        JOIN Transactions t ON fs.transaction_id = t.transaction_id
        JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
        JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
        JOIN Customer c ON a.customer_id = c.customer_id
        JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
        WHERE t.tc_id LIKE '$transaction_id'";

$sql_indiv = "SELECT
                fs.fs_id,
                concat(fs.transaction_id, IFNULL(fs.ending, '')) AS transaction_id,
                fs.invoice,
                fs.total_profit,
                concat(fs.clear_status, '|', debt) AS debt,
                REPLACE(REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC'), 'N|CC', 'CC') AS received,
                fs.selling_price,
                fs.create_time,
                fs.depart_date,
                fs.arrival_date,
                fs.lock_status,
                fs.finish_status,
                i.payment_type,
                fs.check_no
              FROM FinanceStatus fs
              JOIN Transactions t ON fs.transaction_id = t.transaction_id
              JOIN IndividualTour i ON i.indiv_tour_id = t.indiv_tour_id
              JOIN Salesperson s ON i.salesperson_id = s.salesperson_id
              JOIN Wholesaler w ON i.wholesaler_id = w.wholesaler_id
              JOIN Customer c ON i.customer_id = c.customer_id
              WHERE t.tc_id LIKE '$transaction_id'";

$sql = "SELECT * FROM (" . $sql . " UNION " . $sql_indiv . " ) z ORDER BY z.transaction_id";

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
