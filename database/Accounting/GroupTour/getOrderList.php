<?php
include('../../dbConnection.php');

$offset = empty($_GET['offset']) ? 0 : $_GET['offset'];
$transactionId = empty($_GET['transactionId']) ? '%' : $_GET['transactionId'];
$groupCode = empty($_GET['groupCode']) ? '%' : $_GET['groupCode'];
$salesperson = empty($_GET['salesperson']) ? '%' : $_GET['salesperson'];
$wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];
$fromDate = empty($_GET['fromDate']) ? '%' : $_GET['fromDate'];
$toDate = empty($_GET['toDate']) ? date('Y-m-d', strtotime(' +1 day')) : $_GET['toDate'];

$sql = "SELECT t.transaction_id,
          s.salesperson_code,
          g.group_code,
          DATE_FORMAT(t.create_time, '%Y-%m-%d') AS create_time,
          w.wholesaler_code,
          wc.title,
          wc.invoice,
          wc.payment_amount,
          t.clear_status
        FROM Transactions t
        JOIN Salesperson s
        ON t.salesperson_id = s.salesperson_id
        JOIN GroupTour g
        ON g.group_tour_id = t.group_tour_id
        RIGHT JOIN WholesalerCollection wc
        ON wc.group_tour_id = g.group_tour_id
        JOIN Wholesaler w
        ON wc.wholesaler_id = w.wholesaler_id
        WHERE t.transaction_id LIKE '%'
        AND g.group_code LIKE '%'
        AND s.salesperson_code LIKE '%'
        AND w.wholesaler_code LIKE '%'
        AND wc.invoice LIKE '%'
        AND t.create_time <= CURRENT_DATE + INTERVAL 1 DAY
        AND t.create_time > 0
        ORDER BY t.transaction_id DESC
        LIMIT 20 OFFSET $offset";
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
