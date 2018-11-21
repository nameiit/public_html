<?php include('../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];
$group_name = $_SESSION["group_name"];

if ($group_name != 'normal') {
    $login_username = '%';
}

/*
* Get the number of orders to be displayed
*/
if ($_GET['orderType'] == 'group') {
    $transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
    $from_date = empty($_GET['from_date']) ? '%' : $_GET['from_date'];
    $to_date = empty($_GET['to_date']) ? date('Y-m-d', strtotime(' +1 day')) : $_GET['to_date'];
    $group_code = empty($_GET['group_code']) ? '%' : $_GET['group_code'];
    $salesperson_code = $login_username;

    $query = "SELECT COUNT(*)
              FROM GroupTour g
              JOIN Transactions t ON g.group_tour_id = t.group_tour_id
              JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
              WHERE t.transaction_id LIKE '$transaction_id'
              AND t.create_time >= '$from_date'
              AND t.create_time < '$to_date'
              AND g.group_code LIKE '$group_code'
              AND t.clear_status = 'N'
              AND t.lock_status = 'N'
              AND s.salesperson_code LIKE '$salesperson_code'";
    $result = $conn->query($query);
    echo $result->fetch_assoc()['COUNT(*)'];
} else if ($_GET['orderType'] == 'individual') {
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

    $query = "SELECT COUNT(*)
              FROM FinanceStatus fs
              JOIN Transactions t ON fs.transaction_id = t.transaction_id
              JOIN IndividualTour i ON i.indiv_tour_id = t.indiv_tour_id
              JOIN Salesperson s ON i.salesperson_id = s.salesperson_id
              JOIN Customer c ON i.customer_id = c.customer_id
              JOIN Wholesaler w ON i.wholesaler_id = w.wholesaler_id
              WHERE fs.transaction_id LIKE '$transaction_id'
              AND i.product_code LIKE '$product_code'
              AND t.settle_time >= '$from_date'
              AND t.settle_time <= '$to_date'
              AND c.lname LIKE concat('%', '$lname', '%')
              AND c.fname LIKE concat('%', '$fname', '%')
              AND w.wholesaler_code LIKE '$wholesaler'
              AND fs.lock_status LIKE '$lock_status'
              AND fs.clear_status LIKE '$clear_status'
              AND fs.paid_status LIKE '$paid_status'
              AND fs.finish_status LIKE '$finish_status'";
    if ($invoice != '%') {
        $query .= " AND fs.invoice LIKE '$invoice'";
    } else if ($from_invoice != '%' or $to_invoice != '%') {
        $query .= " AND (fs.invoice >= '$from_invoice' AND fs.invoice <= '$to_invoice')";
    }
    echo $query;
    $result = $conn->query($query);
    echo $result->fetch_assoc()['COUNT(*)'];
} else if ($_GET['orderType'] == 'airticket') {
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

    if ($payment_type == 'non-cc') {
      $deal_location = $_GET['deal_location'];
      $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
    }
    $sql = "SELECT count(*)
            FROM FinanceStatus fs
            JOIN Transactions t ON fs.transaction_id = t.transaction_id
            JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
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
    $result = $conn->query($sql);
    echo $result->fetch_assoc()['count(*)'];
}

mysqli_close($conn);
 ?>
