<?php
include('../dbConnection.php');

class GroupTourAccounting {
    function getOrderDetail($transaction_id) {
        global $conn;
        $sql = "SELECT currency, (received+received2) as 'price', expense, cc_id, (SELECT code FROM CouponCode WHERE cc_id = t.cc_id) AS code, coupon, total_profit
                FROM Transactions t
                WHERE transaction_id = '$transaction_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function filter($offset, $transactionId, $groupCode, $agency, $salespersonId, $fromDate, $toDate) {
        global $conn;
        $sql = "SELECT 
                    t.transaction_id, 
                    s.salesperson_code, 
                    concat(c.fname, ' ', c.lname) AS client_name, 
                    t.settle_time AS accounting_time, 
                    w.wholesaler_code, 
                    g.group_tour_invoice,
                    
                ORDER BY create_time DESC
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

    function updateOrder($transactionId, $currency, $price, $expense, $coupon, $couponValue, $profit) {
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
                                      cc_id = '$cc_id', coupon = '$discount', total_profit = $profit
                                  WHERE transaction_id  = '$transactionId'";
                        $conn->query($query);
                        $query = "UPDATE GroupTour
                                  SET price = '$price', total_cost = '$expense'
                                  WHERE group_tour_id =
                                    (SELECT group_tour_id FROM Transactions
                                     WHERE transaction_id = '$transactionId')";
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
                        cc_id = NULL, coupon = '$couponValue', total_profit = '$profit'
                      WHERE transaction_id = '$transactionId'";
            $conn->query($query);
            $query = "UPDATE GroupTour
                      SET price = '$price', total_cost = '$expense'
                      WHERE group_tour_id =
                        (SELECT group_tour_id FROM Transactions
                         WHERE transaction_id = '$transactionId')";
            $conn->query($query);
            echo "Successfully updated";
        } else {
            $query = "UPDATE Transactions
                      SET currency = '$currency', received = '$price', expense = '$expense', total_profit = '$profit'
                      WHERE transaction_id = '$transactionId'";
            $conn->query($query);
            $query = "UPDATE GroupTour
                    SET price = '$price', total_cost = '$expense'
                    WHERE group_tour_id =
                      (SELECT group_tour_id FROM Transactions
                       WHERE transaction_id = '$transactionId')";
            $conn->query($query);
            echo "Successfully updated without coupon";
        }
    }
}


$action = $_POST['action'];

$GroupTourAccounting = new GroupTourAccounting();
if ($action == 'getOrderDetail') {
    $transaction_id = $_POST['transactionId'];
    $result = $GroupTourAccounting->getOrderDetail($transaction_id);
} else if ($action == 'filter') {
    $offset = empty($_POST['offset']) ? 0 : $_POST['offset'];
    $transactionId = empty($_POST['transactionId']) ? '%' : $_POST['transactionId'];
    $groupCode = empty($_POST['groupCode']) ? '%' : $_POST['groupCode'];
    $agency = empty($_POST['agency']) ? '%' : $_POST['agency'];
    $salespersonId = empty($_POST['salespersonId']) ? '%' : $_POST['salespersonId'];
    $fromDate = empty($_POST['fromDate']) ? '%' : $_POST['fromDate'];
    $toDate = empty($_POST['toDate']) ? date('Y-m-d', strtotime(' +1 day')) : $_POST['toDate'];

    $result = $GroupTourAccounting->filter($offset, $transactionId, $groupCode, $agency, $salespersonId, $fromDate, $toDate);
} else if ($action == 'clear') {
    $orderList = $_POST['orderList'];
    $GroupTourAccounting->clearOrder($orderList);
    $result = "Successfully Cleared";
} else if ($action == 'lock') {
    $orderList = $_POST['orderList'];
    $GroupTourAccounting->lockOrder($orderList);
    $result = "Successfully Locked";
} else if ($action == 'update'){
    $transactionId = $_POST['transactionId'];
    $currency = $_POST['currency'];
    $price = $_POST['price'];
    $expense = $_POST['expense'];
    $coupon = $_POST['coupon'];
    $couponValue = $_POST['couponValue'];
    $profit = $_POST['profit'];
    $GroupTourAccounting->updateOrder($transactionId, $currency, $price, $expense, $coupon, $couponValue, $profit);
}
echo $result;

mysqli_close($conn);
 ?>
