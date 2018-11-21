<?php
include('../dbConnection.php');

class GroupOrderHistory {
    function getHistoryOrder() {
        global $conn;

        $transaction_id = (empty($_GET['transaction_id'])) ? '%' : $_GET['transaction_id'];
        $group_code = (empty($_GET['group_code'])) ? '%' : $_GET['group_code'];

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
            $statusFilter = " AND t.clear_status = 'Y' AND t.lock_status = 'Y'";
        } else if ($unClear == 'Y' and $clear == 'Y' and $lock == 'N') {
            $statusFilter = " AND t.lock_status = 'N'";
        } else if ($unClear == 'Y' and $clear == 'Y' and $lock == 'Y') {
            $statusFilter = "";
        } else if ($unClear == 'N' and $clear == 'N' and $lock == 'Y') {
            $statusFilter = " AND t.clear_status = 'Y' AND t.lock_status = 'Y'";
        }

        $from_date = $_GET['from_date'];
        $to_date = $_GET['to_date'];

        $payment_type = $_GET['payment_type'];
        $salesperson = empty($_GET['salesperson']) ? '%' : $_GET['salesperson'];
        $source = empty($_GET['source']) ? '%' : $_GET['source'];

        $profit_min = empty($_GET['profit_min']) ? '-999999999.99' : $_GET['profit_min'];
        $profit_max = empty($_GET['profit_max']) ? '9999999.99' : $_GET['profit_max'];
        $cost_min = empty($_GET['cost_min']) ? '-999999999.99' : $_GET['cost_min'];
        $cost_max = empty($_GET['cost_max']) ? '99999999.99' : $_GET['cost_max'];
        $price_min = empty($_GET['price_min']) ? '-999999999.99' : $_GET['price_min'];
        $price_max = empty($_GET['price_max']) ? '99999999.99' : $_GET['price_max'];

        $total_number_min = empty($_GET['total_number_min']) ? '0' : $_GET['total_number_min'];
        $total_number_max = empty($_GET['total_number_max']) ? '999' : $_GET['total_number_max'];
        $flight_number = empty($_GET['flight_number']) ? '%' : $_GET['flight_number'];
        $bus_company = empty($_GET['bus_company']) ? '%' : $_GET['bus_company'];
        $agency = empty($_GET['agency_name']) ? '%' : $_GET['agency_name'];
        $tourist_guide = empty($_GET['tourist_guide']) ? '%' : $_GET['tourist_guide'];
        $start_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'] . '%';
        $end_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'] . '%';

        $sql = "SELECT
                    t.transaction_id,
                    date_format(t.create_time, '%y-%m-%d') as create_time,
                    t.currency,
                    s.salesperson_code,
                    t.total_profit AS profit,
                    t.received AS revenue,
                    t.expense,
                    t.coupon,
                    cs.source_name,
                    t.clear_status,
                    t.lock_status,
                    t.note,
                    g.group_code,
                    concat(g.leader_number, '/', g.tourist_number) AS total_number,
                    g.flight_number,
                    g.bus_company,
                    concat(date_format(g.start_date, '%Y-%m-%d'), '~', date_format(g.end_date, '%Y-%m-%d')) AS schedule,
                    group_concat(DISTINCT w.wholesaler_code SEPARATOR ', ') AS agency_name,
                    g.group_tour_invoice AS guide_phone,
                    group_concat(DISTINCT concat(tg.fname, ' ', tg.lname) SEPARATOR ', ') AS guide_name
                    FROM Transactions t
                    JOIN GroupTour g
                    ON t.group_tour_id = g.group_tour_id
                    JOIN WholesalerCollection wc
                    ON g.group_tour_id = wc.group_tour_id
                    JOIN Wholesaler w
                    ON wc.wholesaler_id = w.wholesaler_id
                    JOIN GroupTourGuideDetails gtgd
                    ON gtgd.group_tour_id = g.group_tour_id
                    JOIN TouristGuide tg
                    ON tg.guide_id = gtgd.guide_id
                    JOIN CustomerSource cs ON t.source_id = cs.source_id
                    JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
                    WHERE t.transaction_id LIKE '$transaction_id'
                    AND s.salesperson_code LIKE '$salesperson'
                    AND g.leader_number + g.tourist_number >= $total_number_min
                    AND g.flight_number LIKE concat('%', '$bus_company', '%')
                    AND wc.group_tour_id IN
                        (SELECT DISTINCT group_tour_id
                            FROM WholesalerCollection wc
                            JOIN Wholesaler w
                            ON wc.wholesaler_id = w.wholesaler_id
                            WHERE w.wholesaler_code LIKE '$agency')
                    AND DATE_FORMAT(t.create_time, '%Y-%m-%d') <= $to_date
                    AND DATE_FORMAT(t.create_time, '%Y-%m-%d') >= $from_date
                    AND t.payment_type LIKE '$payment_type'     
                    AND cs.source_name LIKE '$source'";
        $sql .= $statusFilter;

        if ($profit_currency == 'USD') {
            $sql .= " AND ((t.currency = 'USD' 
                            AND t.total_profit >= $profit_min 
                            AND t.total_profit <= $profit_max) 
                            OR 
                            (t.currency = 'RMB' 
                            AND t.total_profit <= $profit_max / g.exchange_rate_usd_rmb 
                            AND t.total_profit >= $profit_min / g.exchange_rate_usd_rmb)
                          )";
        } else {
            $sql .= " AND ((t.currency = 'USD' 
                            AND t.total_profit * g.exchange_rate_usd_rmb >= $profit_min 
                            AND t.total_profit * g.exchange_rate_usd_rmb <= $profit_max) 
                            OR 
                            (t.currency = 'RMB' 
                            AND t.total_profit <= $profit_max 
                            AND t.total_profit >= $profit_min)
                            )";        
        }
        if ($price_currency == 'USD') {
            $sql .= " AND ((g.received_currency = 'USD' 
                            AND g.shin_received >= $price_min 
                            AND g.shin_received <= $price_max) 
                            OR 
                            (g.received_currency = 'RMB' 
                            AND g.shin_received >= $price_min / g.exchange_rate_usd_rmb 
                            AND g.shin_received <= $price_max / g.exchange_rate_usd_rmb)
                          )";        
        } else {
            $sql .= " AND ((g.received_currency = 'USD' 
                            AND g.shin_received * g.exchange_rate_usd_rmb >= $price_min 
                            AND g.shin_received * g.exchange_rate_usd_rmb <= $price_max) 
                            OR 
                            (g.received_currency = 'RMB' 
                            AND g.shin_received >= $price_min
                            AND g.shin_received <= $price_max)
                          )";  
        }
        if ($cost_currency == 'USD') {
            $sql .= " AND ((g.total_cost_currency = 'USD' 
                            AND g.total_cost >= $cost_min 
                            AND g.total_cost <= $cost_max) 
                            OR 
                            (g.total_cost_currency = 'RMB' 
                            AND g.total_cost >= $cost_min / g.exchange_rate_usd_rmb 
                            AND g.total_cost <= $cost_max / g.exchange_rate_usd_rmb)
                          )"; 
        } else {
            $sql .= " AND ((g.total_cost_currency = 'USD' 
                            AND g.total_cost * g.exchange_rate_usd_rmb >= $cost_min 
                            AND g.total_cost * g.exchange_rate_usd_rmb <= $cost_max) 
                            OR 
                            (g.total_cost_currency = 'RMB' 
                            AND g.total_cost >= $cost_min 
                            AND g.total_cost <= $cost_max)
                          )"; 
        }

        $sql .= "GROUP BY g.group_tour_id ORDER BY t.transaction_id DESC";
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

$groupOrder = new GroupOrderHistory();
if ($_GET['action'] == 'getHistoryOrder') {
    $result = $groupOrder->getHistoryOrder();
}

echo $result;


mysqli_close($conn);
?>
