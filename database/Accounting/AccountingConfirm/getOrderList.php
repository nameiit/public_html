<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$salesperson = empty($_GET['salesperson']) ? '%' : $_GET['salesperson'];
$type = $_GET['type'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];
$fname = empty($_GET['fname']) ? '%' : $_GET['fname'];
$lname = empty($_GET['lname']) ? '%' : $_GET['lname'];
$wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$locator = empty($_GET['locator']) ? '%' : $_GET['locator'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];
$airline = empty($_GET['airline']) ? '%' : $_GET['airline'];
$payment_type = $_GET['payment_type'];
$lock_status = $_GET['lock_status'] == 'all' ? '%' : $_GET['lock_status'];
$clear_status = $_GET['clear_status'] == 'all' ? '%' : $_GET['clear_status'];
$paid_status = $_GET['paid_status'] == 'all' ? '%' : $_GET['paid_status'];
$finish_status = $_GET['finish_status'] == 'all' ? '%' : $_GET['finish_status'];
$offset = $_GET['offset'];


if ($payment_type == 'non-cc') {
  $deal_location = $_GET['deal_location'];
  $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
}

$sql = "SELECT
          concat(fs.transaction_id, IFNULL(fs.ending, '')) AS transaction_id, fs.invoice, fs.total_profit, concat(fs.clear_status, '|', debt) AS debt,
          REPLACE(REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC'), 'N|CC', 'CC') AS received, fs.selling_price, fs.create_time, fs.depart_date,
          fs.arrival_date, fs.lock_status, fs.finish_status, fs.following_id_collection, t.type, a.payment_type, fs.check_no
        FROM FinanceStatus fs
        JOIN Transactions t ON fs.transaction_id = t.transaction_id
        JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
        JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
        -- JOIN AirticketNumber an ON an.airticket_tour_id = a.airticket_tour_id
        JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
        -- JOIN AirSchedule asl ON a.airticket_tour_id = asl.airticket_tour_id
        WHERE fs.transaction_id LIKE '$transaction_id'
        AND s.salesperson_code LIKE '$salesperson'
        AND t.settle_time >= '$from_date'
        AND t.settle_time <= '$to_date'
        -- AND an.lname LIKE concat('%', '$lname', '%')
        -- AND an.fname LIKE concat('%', '$fname', '%')
        AND w.wholesaler_code LIKE '$wholesaler'
        AND a.locators LIKE '$locator'
        -- AND asl.airline LIKE '$airline'
        AND fs.lock_status LIKE '$lock_status'
        AND fs.clear_status LIKE '$clear_status'
        AND fs.paid_status LIKE '$paid_status'
        AND fs.finish_status LIKE '$finish_status'";
if ($invoice != '%') {
    $sql .= " AND fs.invoice LIKE '$invoice'";
} else if ($from_invoice != '%' or $to_invoice != '%') {
    $sql .= " AND (fs.invoice >= '$from_invoice' AND fs.invoice <= '$to_invoice')";
}

if (!empty($_GET['create_time_sort'])) {
  $sql .= $_GET['create_time_sort'];
} else if (!emptY($_GET['leave_time_sort'])) {
  $sql .= $_GET['leave_time_sort'];
} else if (!empty($_GET['return_time_sort'])) {
  $sql .= $_GET['return_time_sort'];
} else {
  $sql .= " ORDER BY fs.transaction_id DESC";
}
$sql .= " LIMIT 20 OFFSET $offset";

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
