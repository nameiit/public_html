<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$product_code = empty($_GET['group_number']) ? '%' : $_GET['group_number'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$fname = empty($_GET['fname']) ? '%' : $_GET['fname'];
$lname = empty($_GET['lname']) ? '%' : $_GET['lname'];
$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

$depart_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'];
$arrival_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'];

$wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
$payment_type = $_GET['payment_type'];
if ($payment_type == 'non-cc') {
  $deal_location = $_GET['deal_location'];
  $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
}

$lock_status = $_GET['lock_status'] == 'all' ? '%' : $_GET['lock_status'];
$clear_status = $_GET['clear_status'] == 'all' ? '%' : $_GET['clear_status'];
$paid_status = $_GET['paid_status'] == 'all' ? '%' : $_GET['paid_status'];
$finish_status = $_GET['finish_status'] == 'all' ? '%' : $_GET['finish_status'];

$sql = "SELECT count(*)
        FROM Transactions t
        JOIN FinanceStatus fs ON t.transaction_id = fs.transaction_id
        JOIN Refund r ON t.transaction_id = r.transaction_id
        JOIN ExtraSupplement es ON t.transaction_id = es.transaction_id
        JOIN IndividualTour i ON t.indiv_tour_id = i.indiv_tour_id
        JOIN Salesperson s ON s.salesperson_id = i.salesperson_id
        JOIN Wholesaler w ON w.wholesaler_id = i.wholesaler_id
        JOIN CustomerSource cs ON t.source_id = cs.source_id
        JOIN Customer c ON i.customer_id = c.customer_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND i.product_code LIKE '$product_code'
        AND t.settle_time >= '$from_date'
        AND t.settle_time <= '$to_date'
        AND i.depart_date LIKE '$depart_date'
        AND i.arrival_date LIKE '$arrival_date'
        AND w.wholesaler_code LIKE '$wholesaler'
        AND fs.lock_status LIKE '$lock_status'
        AND fs.clear_status LIKE '$clear_status'
        AND fs.paid_status LIKE '$paid_status'
        AND fs.finish_status LIKE '$finish_status'";

if ($invoice != '%') {
  $sql .= " AND i.indiv_tour_invoice LIKE '$invoice'";
} else if ($from_invoice != '%' or $to_invoice != '%') {
  $sql .= " AND (i.indiv_tour_invoice >= '$from_invoice' AND i.indiv_tour_invoice <= '$to_invoice')";
}

/***
*** Todo...
*** 顾客姓名和支付方式???
***/

$result = $conn->query($sql);
echo $result->fetch_assoc()['count(*)'];

mysqli_close($conn);
 ?>
