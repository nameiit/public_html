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
$offset = $_GET['offset'];

$sql = "SELECT
          t.transaction_id,
          s.salesperson_code,
          DATE_FORMAT(t.create_time, '%Y-%m-%d') AS create_time,
          cs.source_name,
          w.wholesaler_code,
          a.invoice,
          DATE_FORMAT(a.ticketed_date, '%Y-%m-%d') as ticketed_date,
          (SELECT GROUP_CONCAT(concat(UPPER(an.fname), '/', an.lname) SEPARATOR ',')
            FROM AirticketNumber an
            WHERE an.airticket_tour_id = a.airticket_tour_id
            GROUP BY an.airticket_tour_id) AS customer_name,
          t.note,
          a.exchange_rate_usd_rmb,
          a.payment_type,
          (SELECT sum(fs.selling_price)
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id
            AND fs.ending <> 'ref'
            AND fs.ending <> 'sup') AS selling_price,
          (SELECT sum(fs.received_finished)
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id
            AND fs.ending <> 'ref'
            AND fs.ending <> 'sup') AS received,
          (SELECT sum(fs.debt_raw)
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id
            AND fs.ending <> 'ref'
            AND fs.ending <> 'sup') AS base_price,
          (SELECT REPLACE(concat('-', IFNULL(sum(r.okay_its_yours_usd_pending), 0), '|', '+', IFNULL(sum(r.nice_gotit_usd_pending), 0)), '-0.00|+0.00', '')
            FROM Refund r
            WHERE r.transaction_id = t.transaction_id) AS give_me_refund_usd,
          (SELECT sum(r.okay_its_yours_usd)
            FROM Refund r
            WHERE r.transaction_id = t.transaction_id) AS okay_its_yours_usd,
          (SELECT sum(r.nice_gotit_usd)
            FROM Refund r
            WHERE r.transaction_id = t.transaction_id) AS nice_gotit_usd,
          (SELECT sum(fs.total_profit)
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id) AS total_profit,
          (SELECT GROUP_CONCAT(an.airticket_number SEPARATOR ',')
            FROM AirticketNumber an
            WHERE an.airticket_tour_id = a.airticket_tour_id
            GROUP BY an.airticket_tour_id) AS airticket_number,
          (SELECT GROUP_CONCAT(DISTINCT asl.airline SEPARATOR ',')
            FROM AirSchedule asl
            WHERE asl.airticket_tour_id = a.airticket_tour_id
            GROUP BY asl.airticket_tour_id) AS airline,
          DATE_FORMAT(a.depart_date, '%Y-%m-%d') as depart_date,
          DATE_FORMAT(a.back_date, '%Y-%m-%d') as back_date,
          a.ticket_type,
          a.round_trip,
          a.locators,
          a.itinerary, 
          a.deal_location, 
          t.confirm_payment_time, 
          (SELECT sum(fs.received_raw) - sum(fs.received_finished)
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id
            AND fs.ending <> 'ref'
            AND fs.ending <> 'sup') AS received_not_finished,
          (SELECT concat(concat('-', sum(fs.debt_raw)), '/', concat('+', sum(fs.received_raw))) 
            FROM FinanceStatus fs
            WHERE fs.transaction_id = t.transaction_id
            AND fs.ending = 'sup') AS supplement
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
          SELECT DISTINCT airticket_tour_id
          FROM AirSchedule
          WHERE airline LIKE '$airline'
          AND (depart_date LIKE '$depart_date'
          OR depart_date LIKE '$back_date')
        )
        AND a.ticketed_date LIKE '$ticketed_date'
        AND w.wholesaler_code LIKE '$wholesaler'
        AND t.transaction_id IN (
          SELECT DISTINCT transaction_id
          FROM FinanceStatus
          WHERE lock_status LIKE '$lock_status'
          AND clear_status LIKE '$clear_status'
          AND paid_status LIKE '$paid_status'
          AND finish_status LIKE '$finish_status'
        )";

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

if (isset($_GET['offset'])) {
    $sql .= " LIMIT 20 OFFSET $offset";
}


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
