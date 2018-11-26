<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$locator = empty($_GET['locator']) ? '%' : $_GET['locator'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$fname = empty($_GET['fname']) ? '%' : $_GET['fname'];
$lname = empty($_GET['lname']) ? '%' : $_GET['lname'];
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
  $deal_location = $_GET['deal_location'];
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
          concat(UPPER(an.fname), '/', an.lname) AS customer_name,
          t.note,
          a.exchange_rate_usd_rmb,
          a.payment_type,
          fs.selling_price,
          fs.received,
          fs.base_price,
          r.give_me_refund_usd,
          r.okay_its_yours_usd,
          r.nice_gotit_usd,
          fs.total_profit,
          GROUP_CONCAT(an.airticket_number SEPARATOR ',') AS airticket_number,
          GROUP_CONCAT(DISTINCT asl.airline SEPARATOR ',') AS airline,
          DATE_FORMAT(a.depart_date, '%Y-%m-%d') as depart_date,
          DATE_FORMAT(a.back_date, '%Y-%m-%d') as back_date,
          a.ticket_type,
          a.round_trip,
          a.locators,
          a.itinerary
        FROM Airtickettour a
        LEFT JOIN Transactions t
        ON a.airticket_tour_id = t.airticket_tour_id
        JOIN Salesperson s
        ON a.salesperson_id = s.salesperson_id
        JOIN Wholesaler w
        ON a.wholesaler_id = w.wholesaler_id
        JOIN AirticketNumber an
        ON an.airticket_tour_id = a.airticket_tour_id
        JOIN FinanceStatus fs
        ON t.transaction_id = fs.transaction_id
        LEFT JOIN Refund r
        ON r.transaction_id = t.transaction_id
        JOIN AirSchedule asl
        ON asl.airticket_tour_id = a.airticket_tour_id
        LEFT JOIN CustomerSource cs
        ON cs.source_id = t.source_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND a.locators LIKE '$locator'
        AND t.settle_time <= '$to_date'
        AND t.settle_time >= '$from_date'
        AND an.fname LIKE concat('%', '$fname', '%')
        AND an.lname LIKE concat('%', '$lname', '%')
        AND asl.airline LIKE '$airline'
        AND a.depart_date LIKE '$depart_date'
        AND a.back_date LIKE '$back_date'
        AND a.ticketed_date LIKE '$ticketed_date'
        AND w.wholesaler_code LIKE '$wholesaler'
        AND fs.lock_status LIKE '$lock_status'
        AND fs.clear_status LIKE '$clear_status'
        AND fs.paid_status LIKE '$paid_status'
        AND fs.finish_status LIKE '$finish_status'";

if ($invoice != '%') {
  $sql .= " AND fs.invoice LIKE '$invoice'";
} else if ($from_invoice != '%' or $to_invoice != '%') {
  $sql .= " AND (fs.invoice >= '$from_invoice' AND fs.invoice <= '$to_invoice')";
}

$sql .=" GROUP BY a.airticket_tour_id";
if (isset($_GET['offset'])) {
    $sql .= " LIMIT 20 OFFSET $offset";
}
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
