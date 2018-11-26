<?php
include('../../dbConnection.php');

$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$group_number = empty($_GET['group_number']) ? '%' : $_GET['group_number'];
$from_date = $_GET['from_date'];
$to_date = $_GET['to_date'];

$fname = empty($_GET['fname']) ? '%' : $_GET['fname'];
$lname = empty($_GET['lname']) ? '%' : $_GET['lname'];
$from_invoice = empty($_GET['from_invoice']) ? '%' : $_GET['from_invoice'];
$to_invoice = empty($_GET['to_invoice']) ? '%' : $_GET['to_invoice'];
$invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

$start_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'];
$end_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'];

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

$sql = "SELECT
            concat(t.transaction_id, fs.ending) AS transaction_id,
            s.salesperson_code,
            i.indiv_tour_invoice,
            t.create_time,
            w.wholesaler_code,
            t.type,
            concat(UPPER(c.lname), '/', c.fname) AS customer_name,
            cs.source_name,
            i.exchange_rate,
            i.payment_type,
            fs.debt,
            fs.debt_cleared,
            fs.selling_price,
            REPLACE(fs.received, 'CC', fs.selling_price) AS received,
            concat(IFNULL(concat('+', es.extra_in_usd), 'null'), IFNULL(concat('/', '-', es.extra_out_usd), '')) AS extra_supplement,
            r.give_me_refund_usd,
            r.okay_its_yours,
            r.nice_gotit,
            t.total_profit
            /***
            *** 旅游团信息取值???
            ***/
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
