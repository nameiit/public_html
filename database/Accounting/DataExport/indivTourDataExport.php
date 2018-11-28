<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$group_number = empty($_GET['group_number']) ? '%' : $_GET['group_number'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

$start_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'];
$end_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'];

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
            i.indiv_tour_invoice,
            DATE_FORMAT(t.create_time, '%Y-%m-%d') AS create_time,
            w.wholesaler_code,
            t.type,
            concat(UPPER(c.lname), '/', c.fname) AS customer_name,
            cs.source_name,
            i.exchange_rate,
            i.payment_type,
            (SELECT sum(fs.debt_raw)
                FROM FinanceStatus fs
                WHERE fs.transaction_id = t.transaction_id
                AND fs.ending <> 'ref'
                AND fs.ending <> 'sup') AS debt,
            (SELECT sum(fs.debt_cleared)
                FROM FinanceStatus fs
                WHERE fs.transaction_id = t.transaction_id
                AND fs.ending <> 'ref'
                AND fs.ending <> 'sup') AS debt_cleared,
            (SELECT sum(fs.received_raw)
                FROM FinanceStatus fs
                WHERE fs.transaction_id = t.transaction_id
                AND fs.ending <> 'ref'
                AND fs.ending <> 'sup') AS selling_price,
            (SELECT sum(fs.received_finished)
                FROM FinanceStatus fs
                WHERE fs.transaction_id = t.transaction_id
                AND fs.ending <> 'ref'
                AND fs.ending <> 'sup') AS received,
            (SELECT REPLACE(concat('-', IFNULL(sum(ep.extra_out_usd_pending), 0), '|', '+', IFNULL(sum(ep.extra_in_usd_pending), 0)), '-0.00|+0.00', '')
                FROM ExtraSupplement ep
                WHERE ep.transaction_id = t.transaction_id
                ) AS extra_supplement,
            (SELECT REPLACE(concat('-', IFNULL(sum(r.okay_its_yours_usd_pending), 0), '|', '+', IFNULL(sum(r.nice_gotit_usd_pending), 0)), '-0.00|+0.00', '')
                FROM Refund r
                WHERE r.transaction_id = t.transaction_id) AS give_me_refund_usd,
            (SELECT sum(r.okay_its_yours_usd)
                FROM Refund r
                WHERE r.transaction_id = t.transaction_id) AS okay_its_yours,
            (SELECT sum(r.nice_gotit_usd)
                FROM Refund r
                WHERE r.transaction_id = t.transaction_id) AS nice_gotit,
            (SELECT sum(fs.total_profit)
                FROM FinanceStatus fs
                WHERE fs.transaction_id = t.transaction_id) AS total_profit,
            i.tour_name,
            i.product_code,
            DATE_FORMAT(i.depart_date, '%Y-%m-%d') AS depart_date,
            DATE_FORMAT(i.arrival_date, '%Y-%m-%d') AS arrival_date,
            (SELECT REPLACE(concat(us_class, '/', first_class, '/', second_class, '/', third_class), 'us/first/second/third', 'NULL')
                FROM DestinationList
                WHERE dl_id = i.dl_id) AS destination_list
        FROM Transactions t
        JOIN IndividualTour i ON t.indiv_tour_id = i.indiv_tour_id
        JOIN Salesperson s ON s.salesperson_id = i.salesperson_id
        JOIN Wholesaler w ON w.wholesaler_id = i.wholesaler_id
        JOIN CustomerSource cs ON t.source_id = cs.source_id
        JOIN Customer c ON i.customer_id = c.customer_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND i.product_code LIKE '$group_number'
        AND t.settle_time >= '$from_date'
        AND t.settle_time <= '$to_date'
        AND DATE_FORMAT(i.depart_date, '%Y-%m-%d') LIKE '$start_date'
        AND DATE_FORMAT(i.arrival_date, '%Y-%m-%d') LIKE '$end_date'
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
