<?php include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];
$group_name = $_SESSION["group_name"];

if ($group_name != 'normal') {
    $login_username = '%';
}

$salesperson = $login_username;
$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$locator = empty($_GET['locator']) ? '%' : $_GET['locator'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];
$fname = empty($_GET['fname']) ? '%' : $_GET['fname'];
$lname = empty($_GET['lname']) ? '%' : $_GET['lname'];
$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];
$wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
$payment_type = $_GET['payment_type'];
$lock_status = $_GET['lock_status'] == 'all' ? '%' : $_GET['lock_status'];
$clear_status = $_GET['clear_status'] == 'all' ? '%' : $_GET['clear_status'];
$paid_status = $_GET['paid_status'] == 'all' ? '%' : $_GET['paid_status'];
$finish_status = $_GET['finish_status'] == 'all' ? '%' : $_GET['finish_status'];
$offset = $_GET['offset'];

$sql = "SELECT
          fs.transaction_id, fs.invoice, fs.total_profit, concat(fs.clear_status, '|', debt) AS debt,
          REPLACE(REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC'), 'N|CC', 'CC') AS received, fs.selling_price, fs.create_time, fs.depart_date,
          fs.arrival_date, fs.lock_status, fs.finish_status, fs.following_id_collection, t.type, a.payment_type, fs.check_no,
          concat(UPPER(c.lname), '/', c.fname) as customer_name, IFNULL(concat(mp.mco_currency, mp.mco_value, '|', mp.mco_credit), '') AS mco
        FROM FinanceStatus fs
        JOIN Transactions t ON fs.transaction_id = t.transaction_id
        JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
        LEFT JOIN McoPayment mp ON mp.mp_id = a.mp_id
        JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
        JOIN Customer c ON a.customer_id = c.customer_id
        JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
        -- JOIN AirSchedule asl ON a.airticket_tour_id = asl.airticket_tour_id
        WHERE fs.transaction_id LIKE '$transaction_id'
        AND s.salesperson_code LIKE '$salesperson'
        AND t.settle_time >= '$from_date'
        AND t.settle_time <= '$to_date'
        AND c.lname LIKE concat('%', '$lname', '%')
        AND c.fname LIKE concat('%', '$fname', '%')
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
$sql .= " LIMIT 15 OFFSET $offset";
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
