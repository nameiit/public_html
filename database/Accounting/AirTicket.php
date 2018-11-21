<?php
include('../dbConnection.php');

class AirTicketAccounting {
    function getOrderDetail($transaction_id) {
        global $conn;
        $sql = "SELECT
                    currency, received, expense, received2, cc_id, (SELECT code FROM CouponCode WHERE cc_id = t.cc_id) AS 'code', coupon, total_profit
                FROM Transactions t
                WHERE transaction_id = $transaction_id";

        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function filter($offset, $transactionId, $locator, $salespersonId, $flightNumber, $customerCount, $fromDate, $toDate) {
        global $conn;
        $sql = "SELECT
                    ato.clear_status, ato.lock_status, ato.transaction_id, ato.locators,
                    ato.flight_code, t.create_time, ato.salesperson_code, ato.payment_type,
                    concat(ato.currency, ' ', ato.received, ' | ', ato.received2, ' | ', ato.expense, ' | ', ato.total_profit) as 'transaction_details',
                    ato.coupon, ato.invoice
                FROM AirticketTourOrder ato
                JOIN Transactions t
                ON ato.transaction_id = t.transaction_id
                JOIN AirTicketTour att
                ON t.airticket_tour_id = att.airticket_tour_id
                WHERE ato.lock_status = 'N'
                    AND ato.transaction_id LIKE '$transactionId'
                    AND ato.locators LIKE  '$locator'
                    AND ato.salesperson_code LIKE '$salespersonId'
                    AND att.adult_number+att.child_number+att.infant_number LIKE '$customerCount'
                    AND ato.create_time >= '$fromDate'
                    AND ato.create_time < '$toDate'
                ORDER BY ato.create_time DESC
                LIMIT 20 OFFSET $offset";
        $result = $conn->query($sql);
        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }
        return json_encode($rows);
    }

    function clearOrder($orderList) {
        global $conn;
        $sql = "UPDATE Transactions SET clear_status = 'Y' WHERE transaction_id ='$orderList[0]'";
        for ($i = 1; $i < sizeof($orderList); $i++) {
            $sql .= "OR transaction_id = '$orderList[$i]'";
        }
        $conn->query($sql);
    }

    function lockOrder($orderList) {
        global $conn;
        $sql = "UPDATE Transactions SET clear_status = 'Y', lock_status = 'Y' WHERE transaction_id ='$orderList[0]'";
        for ($i = 1; $i < sizeof($orderList); $i++) {
            $sql .= "OR transaction_id = '$orderList[$i]'";
        }
        $conn->query($sql);
    }

    function updateOrder($transactionId, $currency, $price, $expense, $received2, $coupon, $couponValue, $profit) {
        global $conn;
        if (!is_numeric($coupon) && !empty($coupon)) {
            $sql = "SELECT cc_id, discount, code_expired FROM CouponCode WHERE code = '$coupon'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $expire = $row['code_expired'];
                    $cc_id = $row['cc_id'];
                    $discount = $row['discount'];
                    if ($expire == 'N') {
                        $query = "UPDATE Transactions
                                  SET currency = '$currency', received = '$price', expense = '$expense',
                                      received2 = '$received2', cc_id = '$cc_id', coupon = '$discount', total_profit = '$profit'
                                  WHERE transaction_id  = '$transactionId'";
                        $conn->query($query);
                        echo "Successfully updated";
                    } else {
                        echo "code expired";
                    }
                }
            } else {
                echo "coupon not exist";
            }
        } else if (is_numeric($coupon)) {
            $query = "UPDATE Transactions
                      SET currency = '$currency',received = '$price', expense = '$expense',
                        received2 = '$received2', cc_id = NULL, coupon = '$couponValue', total_profit = '$profit'
                      WHERE transaction_id = '$transactionId'";
            $conn->query($query);
            echo "Successfully updated";
        } else {
            $query = "UPDATE Transactions
                      SET currency = '$currency', received = '$price', expense = '$expense', received2 = '$received2', total_profit = '$profit'
                      WHERE transaction_id = '$transactionId'";
            $conn->query($query);
            echo "Successfully updated without coupon";
        }
    }
}


$AirTicketAccounting = new AirTicketAccounting();

if ($_GET['action'] == 'getOrderDetail') {
    $transaction_id = $_GET['transactionId'];
    $result = $AirTicketAccounting->getOrderDetail($transaction_id);
} else if ($_GET['action'] == 'filter') {
    $offset = empty($_GET['offset']) ? 0 : $_GET['offset'];
    $transactionId = empty($_GET['transactionId']) ? '%' : $_GET['transactionId'];
    $locator= empty($_GET['locator']) ? '%' : $_GET['locator'];
    $salespersonId = empty($_GET['salespersonId']) ? '%' : $_GET['salespersonId'];
    $flightNumber = empty($_GET['flightNumber']) ? '%' : $_GET['flightNumber'];
    $customerCount = empty($_GET['customerCount']) ? '%' : $_GET['customerCount'];
    $fromDate = empty($_GET['fromDate']) ? '%' : $_GET['fromDate'];
    $toDate = ($_GET['toDate'] == 'NaN-NaN-NaN') ? date('Y-m-d', strtotime(' +1 day')) : $_GET['toDate'];
    $result = $AirTicketAccounting->filter($offset, $transactionId, $locator, $salespersonId, $flightNumber, $customerCount, $fromDate, $toDate);
} else if ($_POST['action'] == 'clear') {
    $orderList = $_POST['orderList'];
    $AirTicketAccounting->clearOrder($orderList);
    $result = "Successfully Cleared";
} else if ($_POST['action'] == 'lock') {
    $orderList = $_POST['orderList'];
    $AirTicketAccounting->lockOrder($orderList);
    $result = "Successfully Locked";
} else if ($_POST['action'] == 'update'){
    $transactionId = $_POST['transactionId'];
    $currency = $_POST['currency'];
    $price = $_POST['price'];
    $expense = $_POST['expense'];
    $received2 = $_POST['receive2'];
    $coupon = $_POST['coupon'];
    $couponValue = $_POST['couponValue'];
    $profit = $_POST['profit'];
    $AirTicketAccounting->updateOrder($transactionId, $currency, $price, $expense, $received2, $coupon, $couponValue, $profit);
}
echo $result;

mysqli_close($conn);
 ?>
