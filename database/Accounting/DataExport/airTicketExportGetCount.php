<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$locator = empty($_GET['locator']) ? '%' : $_GET['locator'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

$airline = empty($_GET['airline']) ? '%' : $_GET['airline'];
$depart_date = empty($_GET['leave_date']) ? '%' : $_GET['leave_date'];
$back_date = empty($_GET['return_date']) ? '%' : $_GET['return_date'];
$ticketed_date = empty($_GET['issue_time']) ? '%' : $_GET['issue_time'];

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
        FROM AirticketTour a
        LEFT JOIN Transactions t
        ON a.airticket_tour_id = t.airticket_tour_id
        JOIN Salesperson s
        ON a.salesperson_id = s.salesperson_id
        JOIN Wholesaler w
        ON a.wholesaler_id = w.wholesaler_id
        LEFT JOIN CustomerSource cs
        ON cs.source_id = t.source_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND a.locators LIKE '$locator'
        AND t.settle_time <= '$to_date'
        AND t.settle_time >= '$from_date'
        AND a.airticket_tour_id IN (
          SELECT airticket_tour_id
          FROM AirSchedule
          WHERE airline LIKE '$airline'
          AND (depart_date LIKE '$depart_date'
          OR depart_date LIKE '$back_date')
        )
        AND a.ticketed_date LIKE '$ticketed_date'
        AND w.wholesaler_code LIKE '$wholesaler'
        AND t.transaction_id IN (
          SELECT transaction_id
          FROM FinanceStatus
          WHERE lock_status LIKE '$lock_status'
          AND clear_status LIKE '$clear_status'
          AND paid_status LIKE '$paid_status'
          AND finish_status LIKE '$finish_status'
        )";

if ($invoice != '%') {
  $sql .= " AND t.transaction_id IN (SELECT transaction_id FROM FinanceStatus WHERE invoice LIKE '$invoice')";
} else if ($from_invoice != '%' or $to_invoice != '%') {
  $sql .= " AND t.transaction_id IN (
            SELECT transacation_id
            FROM FinanceStatus
            WHERE invoice >= '$from_invoice'
            AND invoice <= '$to_invoice')";
}

if ($payment_type == 'cc'){
  $sql .= " AND t.transaction_id IN (SELECT DISTINCT transaction_id FROM FiancenStatus WHERE received = 'CC')";
} else if ($payment_type == 'mco') {
  $sql .= " AND t.transaction_id IN (SELECT DISTINCT transaction_id FROM FiancenStatus WHERE ending = 'mco')";
} else if ($payment_type == 'non-cc') {
  $sql .= " AND a.deal_location LIKE '$deal_location'";
  if (sizeof($non_cc_payment_type_arr) > 0) {
      $sql .= " AND a.payment_type IN (";
      for ($i = 0; $i < sizeof($non_cc_payment_type_arr); $i++) {
          $sql = $sql . "'" . $non_cc_payment_type_arr[$i] . "',";
      }
      $sql = substr($sql, 0, -1);
      $sql .= ")";
  }
}

// echo $sql;
$result = $conn->query($sql);
echo $result->fetch_assoc()['count(*)'];

mysqli_close($conn);
 ?>
