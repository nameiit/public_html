<?php
include('../dbConnection.php');

class IndividualTourAccounting {
    function getOrderDetail($transaction_id) {
        global $conn;
        $sql = "SELECT currency, revenue, cost, coupon, total_profit FROM IndividualTourOrder WHERE transaction_id  = '$transaction_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function filter($offset, $transactionId, $individualTourCode, $wholeasler, $salespersonId, $touristCount, $fromDate, $toDate) {
        global $conn;
        $sql = "SELECT t.clear_status, t.lock_status, t.transaction_id, it.product_code, t.create_time, s.salesperson_code, it.indiv_number,
                        concat(w.name, '(', w.wholesaler_code, ')') as 'wholesaler',
                        concat(t.currency, ' ', t.received+t.received2, ' | ', t.expense, ' | ', t.total_profit) as 'transaction_details',
                        t.coupon
                FROM Transactions t
                RIGHT JOIN IndividualTour it
                ON t.indiv_tour_id = it.indiv_tour_id
                JOIN wholesaler w
                ON it.wholesaler_id = w.wholesaler_id
                JOIN salesperson s
                ON t.salesperson_id = s.salesperson_id
                WHERE t.lock_status = 'N' AND t.transaction_id LIKE '$transactionId'
                    AND it.product_code LIKE '$individualTourCode' AND s.salesperson_code LIKE '$salespersonId'
                    AND w.wholesaler_code LIKE '$wholeasler'";
        if ($touristCount != '%') {
            $sql .= " AND indiv_number >= '$touristCount'";
        }
        $sql .= " AND create_time >= '$fromDate' AND create_time < '$toDate' ORDER BY";
        if ($touristCount != '%') {
            $sql .= " indiv_number ASC,";
        }
        $sql .= " t.create_time DESC LIMIT 20 OFFSET $offset";
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

        $sql = "UPDATE TourDetails SET clear_status = 'Y' WHERE indiv_collection_id IN" . " ('$orderList[0]'";
        for ($i = 1; $i < sizeof($orderList); $i++) {
            $sql .= ", '$orderList[$i]'";
        }
        $sql .= ")";
        $conn->query($sql);
    }

    function lockOrder($orderList) {
        global $conn;

        $sql = "UPDATE TourDetails SET clear_status = 'Y', lock_status = 'Y' WHERE indiv_collection_id IN" . " ('$orderList[0]'";
        for ($i = 1; $i < sizeof($orderList); $i++) {
            $sql .= ", '$orderList[$i]'";
        }
        $sql .= ")";
        $conn->query($sql);
    }

    function updateOrder($transactionId, $expense) {
        global $conn;

        $sql = "UPDATE Transactions SET expense = '$expense', total_profit = received + received2 - expense - coupon WHERE transaction_id = '$transactionId'";
        $conn->query($sql);
    }


    function getCustomerList() {
        global $conn;

        $transactionId = $_GET['transactionId'];
        $sql = "SELECT
                    td.indiv_collection_id, concat(c.fname, ' ', c.lname) AS customer_name,
                    td.currency, td.payment_amount, td.coupon,
                    td.clear_status, td.lock_status
                FROM TourDetails td
                JOIN Customer c
                ON td.customer_id = c.customer_id
                WHERE indiv_tour_id = (SELECT indiv_tour_id FROM Transactions WHERE transaction_id = $transactionId)";
        $result = $conn->query($sql);

        $res = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return json_encode($res);
    }


    function getTourDetails() {
        global $conn;

        $indiv_collection_id = $_GET['indiv_collection_id'];

        $sql = "SELECT count(cc_id) AS ct FROM TourDetails WHERE indiv_collection_id = '$indiv_collection_id'";
        $count = $conn->query($sql)->fetch_assoc()['ct'];

        if ($count == 0) {
            $sql = "SELECT currency, payment_amount, cc_id, coupon FROM TourDetails WHERE indiv_collection_id = '$indiv_collection_id'";
            $result = $conn->query($sql);
        } else {
            $sql = "SELECT td.currency, td.payment_amount, td.cc_id, c.code, td.coupon
                    FROM TourDetails td JOIN CouponCode c
                    ON td.cc_id = c.cc_id
                    WHERE td.indiv_collection_id = '$indiv_collection_id'";
            $result = $conn->query($sql);
        }

        return json_encode($result->fetch_assoc());
    }


    function updateTourDetail() {
        global $conn;

        $payment_amount = $_POST['payment_amount'];
        $currency = $_POST['currency'];
        $coupon = $_POST['coupon'];
        $indiv_collection_id = $_POST['indiv_collection_id'];


        // 拿到indiv_tour_id
        $sql = "SELECT indiv_tour_id FROM TourDetails WHERE indiv_collection_id = '$indiv_collection_id'";
        $indiv_tour_id = $conn->query($sql)->fetch_assoc()['indiv_tour_id'];

        $sql = "SELECT exchange_rate FROM IndividualTour WHERE indiv_tour_id = $indiv_tour_id";
        $exchange_rate = $conn->query($sql)->fetch_assoc()['exchange_rate'];

        $sql = "SELECT currency, coupon, payment_amount FROM TourDetails WHERE indiv_collection_id = '$indiv_collection_id'";
        $result = $conn->query($sql)->fetch_assoc();
        $previous_coupon = $result['coupon'];  //改之前的coupon
        $previous_currency = $result['currency']; //改之前的货币
        $previous_payment_amount = $result['payment_amount']; //改之前的价格
        // $exchange_rate = $result['exchange_rate']; //创建订单时的汇率
        if ($previous_currency == 'RMB') {
            $previous_coupon = $previous_coupon / $exchange_rate;
            $previous_payment_amount = $previous_payment_amount / $exchange_rate;
        }


        $sql = "SELECT received, coupon FROM Transactions WHERE indiv_tour_id = '$indiv_tour_id'";
        $result = $conn->query($sql)->fetch_assoc();
        $previoud_received = $result['received'];   //改之前的总收入
        $previous_total_coupon = $result['coupon'];  //改之前的总折扣

        if (!is_numeric($coupon) && !empty($coupon)) {
            $sql = "SELECT cc_id, discount, code_expired FROM CouponCode WHERE code = '$coupon'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $expire = $row['code_expired'];
                    $cc_id = $row['cc_id'];
                    $discount = $row['discount'];

                    if ($expire == 'N') {
                        $query = "UPDATE
                                    TourDetails
                                  SET
                                    payment_amount = '$payment_amount',
                                    cc_id = '$cc_id',
                                    coupon = '$discount',
                                    currency = '$currency'
                                  WHERE
                                    indiv_collection_id = '$indiv_collection_id'";
                        $conn->query($query);

                        if ($currency == 'RMB') {
                            $discount = $discount / $exchange_rate;
                            $payment_amount = $payment_amount / $exchange_rate;
                        }

                        $query = "UPDATE Transactions
                                  SET coupon = $previous_total_coupon - $previous_coupon + $discount,
                                      received = $previoud_received - $previous_payment_amount + $payment_amount,
                                      total_profit = received + received2 - expense - coupon
                                  WHERE indiv_tour_id = '$indiv_tour_id'";
                        $conn->query($query);
                        echo "Successfully updated";
                    } else {
                        echo "code expired";
                    }
                }
            } else {
                echo "coupon not exist";
            }
        }
        else if (is_numeric($coupon)) {
            $query = "UPDATE
                        TourDetails
                      SET
                        currency = '$currency',
                        payment_amount = '$payment_amount',
                        cc_id = NULL,
                        coupon = '$coupon'
                      WHERE indiv_collection_id = '$indiv_collection_id'";
            $conn->query($query);

            if ($currency == 'RMB') {
                $coupon = $coupon / $exchange_rate;
                $payment_amount = $payment_amount / $exchange_rate;
            }

            $query = "UPDATE transactions
                      SET coupon = $previous_total_coupon - $previous_coupon + $coupon,
                          received = $previoud_received - $previous_payment_amount + $payment_amount,
                          total_profit = received + received2 - expense - coupon
                      WHERE indiv_tour_id = '$indiv_tour_id'";
            $conn->query($query);
            echo "Successfully updated";
        }
        else {
            $query = "UPDATE
                        TourDetails
                      SET
                        currency = '$currency',
                        payment_amount = '$payment_amount',
                        cc_id = NULL,
                        coupon = 0
                      WHERE indiv_collection_id = '$indiv_collection_id'";
            $conn->query($query);

            if ($currency == 'RMB') {
                $payment_amount = $payment_amount / $exchange_rate;
            }

            $query = "UPDATE transactions
                      SET coupon = $previous_total_coupon - $previous_coupon,
                          total_profit = received + received2 - expense - coupon
                      WHERE indiv_tour_id = '$indiv_tour_id'";
            $conn->query($query);
            echo "Successfully updated without coupon";
        }
    }


    function updateDisplayInfo() {
        global $conn;

        $transactionId = $_GET['transactionId'];

        $sql = "SELECT concat(ito.currency, ' ', ito.revenue, ' | ', ito.cost, ' | ', ito.total_profit) AS transaction_details, ito.coupon
                FROM IndividualTourOrder ito
                WHERE transaction_id = '$transactionId'";
        $result = $conn->query($sql);
        return json_encode($result->fetch_assoc());
    }
}


$IndividualTourAccounting = new IndividualTourAccounting();

if ($_GET['action'] == 'getOrderDetail') {

    $transaction_id = $_GET['transactionId'];
    $result = $IndividualTourAccounting->getOrderDetail($transaction_id);

} else if ($_GET['action'] == 'filter') {

    $offset = empty($_GET['offset']) ? 0 : $_GET['offset'];
    $transactionId = empty($_GET['transactionId']) ? '%' : $_GET['transactionId'];
    $individualTourCode = empty($_GET['individualTourCode']) ? '%' : $_GET['individualTourCode'];
    $salespersonId = empty($_GET['salespersonId']) ? '%' : $_GET['salespersonId'];
    $wholeasler = empty($_GET['wholeasler']) ? '%' : $_GET['wholeasler'];
    $touristCount = empty($_GET['touristCount']) ? '%' : $_GET['touristCount'];
    $fromDate = empty($_GET['fromDate']) ? '%' : $_GET['fromDate'];
    $toDate = ($_GET['toDate'] == 'NaN-NaN-NaN') ? date('Y-m-d', strtotime(' +1 day')) : $_GET['toDate'];
    $result = $IndividualTourAccounting->filter($offset, $transactionId, $individualTourCode, $wholeasler, $salespersonId, $touristCount, $fromDate, $toDate);

} else if ($_POST['action'] == 'clear') {

    $orderList = $_POST['orderList'];
    $IndividualTourAccounting->clearOrder($orderList);
    $result = "Successfully Cleared";

} else if ($_POST['action'] == 'lock') {

    $orderList = $_POST['orderList'];
    $IndividualTourAccounting->lockOrder($orderList);
    $result = "Successfully Locked";

} else if ($_POST['action'] == 'updateTransaction') {

    $transactionId = $_POST['transactionId'];
    $expense = $_POST['expense'];
    $IndividualTourAccounting->updateOrder($transactionId, $expense);

} else if ($_GET['action'] == 'getCustomerList') {

    $result = $IndividualTourAccounting->getCustomerList();

} else if ($_GET['action'] == 'getTourDetails') {

    $result = $IndividualTourAccounting->getTourDetails();

} else if ($_POST['action'] == 'updateTourDetail') {

    $result = $IndividualTourAccounting->updateTourDetail();

} else if ($_GET['action'] == 'updateDisplayInfo') {

    $result = $IndividualTourAccounting->updateDisplayInfo();

}
echo $result;

mysqli_close($conn);
 ?>
