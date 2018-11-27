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

    $sql_indiv = "SELECT count(*) AS num_orders,
                    sum(fs.debt_raw) AS sum_debt,
                    sum(fs.received_raw) AS sum_received,
                    sum(fs.total_profit) AS sum_profit,
                    sum(fs.selling_price) AS sum_selling_price
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
    // echo $sql_indiv;
    $result = $conn->query($sql_indiv);

    $res = array();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $res = $row;
    }

    echo json_encode($res);

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

    $airline = empty($_GET['airline']) ? '%' : $_GET['airline'];

    if ($payment_type == 'non-cc') {
      $deal_location = $_GET['deal_location'];
      $non_cc_payment_type_arr = json_decode($_GET['non_cc_payment_type']);
    }
    $sql = "SELECT
                count(*) AS num_orders,
                sum(fs.total_profit) AS sum_profit,
                sum(fs.debt_raw) AS sum_debt,
                sum(fs.received_raw) AS sum_received,
                sum(fs.selling_price) AS sum_selling_price
            FROM FinanceStatus fs
            JOIN Transactions t ON fs.transaction_id = t.transaction_id
            JOIN AirticketTour a ON a.airticket_tour_id = t.airticket_tour_id
            JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
            JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
            WHERE fs.transaction_id LIKE '$transaction_id'
            AND s.salesperson_code LIKE '$salesperson'
            AND t.settle_time >= '$from_date'
            AND t.settle_time <= '$to_date'
            AND w.wholesaler_code LIKE '$wholesaler'
            AND a.locators LIKE '$locator'
            AND fs.lock_status LIKE '$lock_status'
            AND fs.clear_status LIKE '$clear_status'
            AND fs.paid_status LIKE '$paid_status'
            AND fs.finish_status LIKE '$finish_status'
            AND a.airticket_tour_id IN
            (SELECT airticket_tour_id
            FROM AirticketNumber
            WHERE fname LIKE concat('%', '$fname','%')
            AND lname LIKE concat('%','$lname','%'))
            AND a.airticket_tour_id IN
            (SELECT airticket_tour_id FROM AirSchedule WHERE airline LIKE '$airline')";
    if ($invoice != '%') {
        $sql .= " AND fs.invoice LIKE '$invoice'";
    } else if ($from_invoice != '%' or $to_invoice != '%') {
        $sql .= " AND (fs.invoice >= '$from_invoice' AND fs.invoice <= '$to_invoice')";
    }

    if ($payment_type == 'cc'){
        $sql .= " AND fs.received = 'CC'";
    } else if ($payment_type == 'mco') {
        $sql .= " AND fs.ending = 'mco'";
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
    $result = $conn->query($sql);

    $res = array();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $res = $row;
    }

    echo json_encode($res);
}

mysqli_close($conn);
 ?>
