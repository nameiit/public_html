<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$product_code = empty($_GET['group_number']) ? '%' : $_GET['group_number'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

$depart_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'];
$arrival_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'];

$wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
$payment_type = $_GET['payment_type'];
if ($payment_type == 'non-cc') {
  $deal_location = $_GET['deal_location'] == 'all' ? '%' : $_GET['deal_location'];
  $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
}

$lock_status = $_GET['lock_status'] == 'all' ? '%' : $_GET['lock_status'];
$clear_status = $_GET['clear_status'] == 'all' ? '%' : $_GET['clear_status'];
$paid_status = $_GET['paid_status'] == 'all' ? '%' : $_GET['paid_status'];
$finish_status = $_GET['finish_status'] == 'all' ? '%' : $_GET['finish_status'];
$sql = "SELECT count(*)
        FROM Transactions t
        JOIN IndividualTour i ON t.indiv_tour_id = i.indiv_tour_id
        JOIN Salesperson s ON s.salesperson_id = i.salesperson_id
        JOIN Wholesaler w ON w.wholesaler_id = i.wholesaler_id
        JOIN CustomerSource cs ON t.source_id = cs.source_id
        JOIN Customer c ON i.customer_id = c.customer_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND i.product_code LIKE '$product_code'
        AND t.settle_time >= '$from_date'
        AND t.settle_time <= '$to_date'
        AND DATE_FORMAT(i.depart_date, '%Y-%m-%d') LIKE '$depart_date'
        AND DATE_FORMAT(i.arrival_date, '%Y-%m-%d') LIKE '$arrival_date'
        AND w.wholesaler_code LIKE '$wholesaler'
        AND t.transaction_id IN ( 
            SELECT DISTINCT transaction_id FROM FinanceStatus fs 
            WHERE fs.lock_status LIKE '$lock_status'
            AND fs.clear_status LIKE '$clear_status'
            AND fs.paid_status LIKE '$paid_status'
            AND fs.finish_status LIKE '$finish_status')";

if ($invoice != '%') {
    $sql .= " AND t.transaction_id IN (SELECT DISTINCT transaction_id FROM FinanceStatus WHERE invoice LIKE '$invoice')";
  } else if ($from_invoice != '%' or $to_invoice != '%') {
    $sql .= " AND t.transaction_id IN (
              SELECT DISTINCT transacation_id 
              FROM FinanceStatus 
              WHERE invoice >= '$from_invoice' 
              AND invoice <= '$to_invoice')";
  }
  
  if ($payment_type == 'cc'){
    $sql .= " AND t.transaction_id IN (SELECT DISTINCT transaction_id FROM FiancenStatus WHERE received = 'CC')";
  } else if ($payment_type == 'mco') {
    $sql .= " AND t.transaction_id IN (SELECT DISTINCT transaction_id FROM FiancenStatus WHERE ending = 'mco')";
  } else if ($payment_type == 'non-cc') {
    $sql .= " AND i.deal_location LIKE '$deal_location'";
    if (sizeof($non_cc_payment_type_arr) > 0) {
        $sql .= " AND i.payment_type IN (";
        for ($i = 0; $i < sizeof($non_cc_payment_type_arr); $i++) {
            $sql = $sql . "'" . $non_cc_payment_type_arr[$i] . "',";
        }
        $sql = substr($sql, 0, -1);
        $sql .= ")";
    }
  }
  

$result = $conn->query($sql);
echo $result->fetch_assoc()['count(*)'];

mysqli_close($conn);
 ?>
