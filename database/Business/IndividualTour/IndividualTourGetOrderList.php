<?php include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];
$group_name = $_SESSION["group_name"];

if ($group_name != 'normal') {
    $login_username = '%';
}

$salesperson = $login_username;
$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$product_code = empty($_GET['product_code']) ? '%' : $_GET['product_code'];
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

if ($payment_type == 'non-cc') {
  $deal_location = $_GET['deal_location'];
  $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
}

$offset = $_GET['offset'];

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
                fs.following_id_collection,
                t.type,
                i.payment_type,
                fs.check_no,
                concat(UPPER(c.lname), '/', c.fname) as customer_name
            FROM FinanceStatus fs
            JOIN Transactions t ON fs.transaction_id = t.transaction_id
            JOIN IndividualTour i ON i.indiv_tour_id = t.indiv_tour_id
            JOIN Salesperson s ON i.salesperson_id = s.salesperson_id
            JOIN Wholesaler w ON i.wholesaler_id = w.wholesaler_id
            JOIN Customer c ON i.customer_id = c.customer_id
            WHERE fs.transaction_id LIKE '$transaction_id'
            AND s.salesperson_code LIKE '$salesperson'
            AND t.settle_time >= '$from_date'
            AND t.settle_time <= '$to_date'
            AND w.wholesaler_code LIKE '$wholesaler'
            AND fs.lock_status LIKE '$lock_status'
            AND fs.clear_status LIKE '$clear_status'
            AND fs.paid_status LIKE '$paid_status'
            AND fs.finish_status LIKE '$finish_status'
            AND c.fname LIKE '$fname'
            AND c.lname LIKE '$lname'
            ";
if ($payment_type == 'cc'){
    $sql_indiv .= " AND fs.received = 'CC'";
} else if ($payment_type == 'mco') {
    $sql_indiv .= " AND fs.ending = 'mco'";
} else if ($payment_type == 'non-cc') {
    $sql_indiv .= " AND i.deal_location LIKE '$deal_location'";
    if (sizeof($non_cc_payment_type_arr) > 0) {
        $sql_indiv .= " AND i.payment_type IN (";
        for ($i = 0; $i < sizeof($non_cc_payment_type_arr); $i++) {
            $sql_indiv = $sql_indiv . "'" . $non_cc_payment_type_arr[$i] . "','" . 'wholesaler' . $non_cc_payment_type_arr[$i] . "',";
        }
        $sql_indiv = substr($sql_indiv, 0, -1);
        $sql_indiv .= ")";
    }
}

if ($invoice != '%') {
    $sql_indiv .= " AND fs.invoice LIKE '$invoice'";
} else if ($from_invoice != '%' or $to_invoice != '%') {
    $sql_indiv .= " AND (fs.invoice >= '$from_invoice' AND fs.invoice <= '$to_invoice')";
}

$sql = $sql_indiv;

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
