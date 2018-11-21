<?php
include('../dbConnection.php');

class AirTicketOrderHistory {
    function getHistoryOrder() {
        global $conn;

        $transaction_id = (empty($_GET['transaction_id'])) ? '%' : $_GET['transaction_id'];
        $locator = (empty($_GET['locator'])) ? '%' : $_GET['locator'];

        $status = json_decode($_GET['status']);

        $unClear = 'N';
        $clear = 'N';
        $lock = 'N';
        $statusFilter = "";

        for ($i = 0; $i < sizeof($status); $i++) {
            if ($status[$i] == 'unClear') {
                $unClear = 'Y';
            } else if ($status[$i] == 'clearOrder') {
                $clear = 'Y';
            } else if ($status[$i] == 'lockOrder') {
                $lock = 'Y';
            }
        }

        if ($unClear == 'Y' and $clear == 'N' and $lock == 'N') {
            $statusFilter = " AND t.clear_status = 'N' AND t.lock_status = 'N'";
        } else if ($unClear == 'N' and $clear == 'Y' and $lock == 'N') {
            $statusFilter = " AND t.clear_status = 'Y' AND t.lock_status = 'N'";
        } else if ($unClear == 'N' and $clear == 'Y' and $lock == 'Y') {
            $statusFilter = " AND (t.clear_status = 'Y' OR t.lock_status = 'Y')";
        } else if ($unClear == 'Y' and $clear == 'Y' and $lock == 'N') {
            $statusFilter = " AND t.lock_status = 'N'";
        } else if ($unClear == 'Y' and $clear == 'Y' and $lock == 'Y') {
            $statusFilter = "";
        } else if ($unClear == 'N' and $clear == 'N' and $lock == 'Y') {
            $statusFilter = " AND (t.clear_status = 'Y' OR t.lock_status = 'Y')";
        }

        $from_date = $_GET['from_date'];
        $to_date = $_GET['to_date'];

        $payment_type = $_GET['payment_type'];
        $salesperson = empty($_GET['salesperson']) ? '%' : $_GET['salesperson'];
        $travel_agency = empty($_GET['travel_agency']) ? '%' : $_GET['travel_agency'];
        $source = empty($_GET['source']) ? '%' : $_GET['source'];

        $profit_min = empty($_GET['profit_min']) ? '-999999999.99' : $_GET['profit_min'];
        $profit_max = empty($_GET['profit_max']) ? '9999999.99' : $_GET['profit_max'];
        $profit_currency = $_GET['profit_currency']; // 利润

        $cost_min = empty($_GET['cost_min']) ? '-999999999.99' : $_GET['cost_min'];
        $cost_max = empty($_GET['cost_max']) ? '99999999.99' : $_GET['cost_max'];
        $cost_currency = $_GET['cost_currency']; // 成本

        $price_min = empty($_GET['price_min']) ? '-999999999.99' : $_GET['price_min'];
        $price_max = empty($_GET['price_max']) ? '99999999.99' : $_GET['price_max'];
        $price_currency = $_GET['price_currency']; // 价格


        $adult_number = empty($_GET['adult_number']) ? '%' : $_GET['adult_number'];
        $children_number = empty($_GET['children_number']) ? '%' : $_GET['children_number'];
        $infant_number = empty($_GET['infant_nunmber']) ? '%' : $_GET['infant_nunmber'];
        // $customer_name = empty($_GET['customer_name']) ? '%' : '%' . $_GET['customer_name'] . '%';
        $flight_number = empty($_GET['flight_number']) ? '%' : $_GET['flight_number'];
        $leave_airport = empty($_GET['leave_airport']) ? '%' : $_GET['start_date'];
        $arrival_airport = empty($_GET['arrival_airport']) ? '%' : $_GET['arrival_airport'];
        $leave_date = empty($_GET['leave_date']) ? '0' : $_GET['leave_date'];
        $arrival_date = empty($_GET['arrival_date']) ? '%' : $_GET['arrival_date'];

        $arrival_date = ($arrival_date == '%')? 'CURRENT_DATE + interval 1 year' : "'$arrival_date'";

        $round_trip = $_GET['round_trip'];
        $ticket_type = $_GET['ticket_type'];
        $refunded = $_GET['refunded'];


        $sql = "SELECT
                    t.transaction_id,
                    DATE_FORMAT(t.create_time, '%Y-%m-%d') AS create_time,
                    s.salesperson_code,
                    t.currency,
                    t.total_profit,
                    t.received,
                    concat(a.received2_currency, ' ', a.received2) AS received2,
                    t.expense,
                    t.coupon,
                    (SELECT cc.code FROM CouponCode cc WHERE cc.cc_id = a.cc_id) as 'code',
                    cs.source_name,
                    t.clear_status,
                    t.lock_status,
                    t.note,
                    a.locators,
                    a.invoice,
                    a.flight_code,
                    a.round_trip,
                    concat(a.ticket_type, ' ', a.adult_number+a.child_number+a.infant_number) AS ticket_type,
                    w.wholesaler_code,
                    a.refunded,
                    ta.agency_name
                FROM AirticketTour a
                JOIN Transactions t ON a.airticket_tour_id = t.airticket_tour_id
                JOIN Customer c ON a.customer_id = c.customer_id
                JOIN CustomerSource cs ON t.source_id = cs.source_id
                JOIN TravelAgency ta ON a.ta_id = ta.ta_id
                JOIN Salesperson s ON a.salesperson_id = s.salesperson_id
                JOIN Wholesaler w ON a.wholesaler_id = w.wholesaler_id
                WHERE
                t.transaction_id IN
                (
                    SELECT transaction_id FROM Transactions WHERE airticket_tour_id IN
                    (
                        SELECT DISTINCT airticket_tour_id FROM AirSchedule WHERE
                        depart_airport LIKE '$leave_airport'
                        AND arrival_airport LIKE '$arrival_airport'
                        AND DATE_FORMAT(depart_date, '%Y-%m-%d') >= '$leave_date'
                        AND DATE_FORMAT(depart_date, '%Y-%m-%d') <= $arrival_date
                    )
                ) AND t.transaction_id LIKE '$transaction_id'";
        $sql .= $statusFilter;
        $sql .= " AND a.locators LIKE '$locator'
                AND DATE_FORMAT(t.create_time, '%Y-%m-%d') <= '$to_date'
                AND DATE_FORMAT(t.create_time, '%Y-%m-%d') >= '$from_date'
                AND t.payment_type LIKE '$payment_type'
                AND s.salesperson_code LIKE '$salesperson'
                AND cs.source_name LIKE '$source'
                AND ta.agency_name LIKE '$travel_agency'
                AND a.adult_number LIKE '$adult_number'
                ANd a.child_number LIKE '$children_number'
                ANd a.infant_number LIKE '$infant_number'
                AND a.flight_code LIKE '$flight_number'
                AND a.round_trip LIKE '$round_trip'
                AND a.ticket_type LIKE '$ticket_type'
                AND a.refunded LIKE '$refunded'
                ";
        if ($profit_currency == 'USD') {
            $sql .= " AND ((t.currency = 'USD'
                            AND t.total_profit >= $profit_min
                            AND t.total_profit <= $profit_max)
                            OR
                            (t.currency = 'RMB'
                            AND t.total_profit <= $profit_max / a.exchange_rate_usd_rmb
                            AND t.total_profit >= $profit_min / a.exchange_rate_usd_rmb)
                          )";
        } else {
            $sql .= " AND ((t.currency = 'USD'
                            AND t.total_profit * a.exchange_rate_usd_rmb >= $profit_min
                            AND t.total_profit * a.exchange_rate_usd_rmb <= $profit_max)
                            OR
                            (t.currency = 'RMB'
                            AND t.total_profit <= $profit_max
                            AND t.total_profit >= $profit_min)
                            )";
        }
        if ($price_currency == 'USD') {
            $sql .= " AND ((a.sale_currency = 'USD'
                            AND a.received >= $price_min
                            AND a.received <= $price_max)
                            OR
                            (a.sale_currency = 'RMB'
                            AND a.received >= $price_min / a.exchange_rate_usd_rmb
                            AND a.received <= $price_max / a.exchange_rate_usd_rmb)
                          )";
        } else {
            $sql .= " AND ((a.sale_currency = 'USD'
                            AND a.received * a.exchange_rate_usd_rmb >= $price_min
                            AND a.received * a.exchange_rate_usd_rmb <= $price_max)
                            OR
                            (a.sale_currency = 'RMB'
                            AND a.received >= $price_min
                            AND a.received <= $price_max)
                          )";
        }
        if ($cost_currency == 'USD') {
            $sql .= " AND ((a.base_currency = 'USD'
                            AND a.base_price >= $cost_min
                            AND a.base_price <= $cost_max)
                            OR
                            (a.base_currency = 'RMB'
                            AND a.base_price >= $cost_min / a.exchange_rate_usd_rmb
                            AND a.base_price <= $cost_max / a.exchange_rate_usd_rmb)
                          )";
        } else {
            $sql .= " AND ((a.base_currency = 'USD'
                            AND a.base_price * a.exchange_rate_usd_rmb >= $cost_min
                            AND a.base_price * a.exchange_rate_usd_rmb <= $cost_max)
                            OR
                            (a.base_currency = 'RMB'
                            AND a.base_price >= $cost_min
                            AND a.base_price <= $cost_max)
                          )";
        }
        $sql .= "ORDER BY t.transaction_id DESC";
        // echo $sql;
        $result = $conn->query($sql);

        $res = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return json_encode($res);
    }
}

$airTicketOrder = new AirTicketOrderHistory();
if ($_GET['action'] == 'getHistoryOrder') {
    $result = $airTicketOrder->getHistoryOrder();
}

echo $result;


mysqli_close($conn);
?>
