<?php
include('../dbConnection.php');

class AllOrderHistory {
    function getHistoryOrder() {
        global $conn;

        $transaction_id = (empty($_GET['transaction_id'])) ? '%' : $_GET['transaction_id'];

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

        $currency = $_GET['currency'];

        $profit_min = empty($_GET['profit_min']) ? '-999999999.99' : $_GET['profit_min'];
        $profit_max = empty($_GET['profit_max']) ? '9999999.99' : $_GET['profit_max'];
        $cost_min = empty($_GET['cost_min']) ? '-999999999.99' : $_GET['cost_min'];
        $cost_max = empty($_GET['cost_max']) ? '99999999.99' : $_GET['cost_max'];
        $price_min = empty($_GET['price_min']) ? '-999999999.99' : $_GET['price_min'];
        $price_max = empty($_GET['price_max']) ? '99999999.99' : $_GET['price_max'];

        $sql_group = "SELECT
                        t.transaction_id, 
                        date_format(t.create_time, '%y-%m-%d') as create_time, 
                        t.currency, 
                        s.salesperson_code, 
                        t.total_profit, 
                        t.received AS revenue, 
                        t.expense, 
                        t.coupon,
                        cs.source_name, 
                        t.clear_status, 
                        t.lock_status, 
                        t.note
                        FROM Transactions t
                        JOIN CustomerSource cs ON t.source_id = cs.source_id
                        JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
                        WHERE t.transaction_id LIKE '$transaction_id'
                        AND t.type = 'group'
                        AND s.salesperson_code LIKE '$salesperson'
                        AND DATE_FORMAT(t.create_time, '%Y-%m-%d') <= $to_date
                        AND DATE_FORMAT(t.create_time, '%Y-%m-%d') >= $from_date
                        AND cs.source_name LIKE '$source'
                        AND t.payment_type LIKE '$payment_type'
                        AND
                        ((
                            t.currency = 'USD'
                            AND t.total_profit >= $profit_min
                            AND t.total_profit <= $profit_max
                            AND t.expense >= $cost_min
                            AND t.expense <= $cost_max
                            AND t.received>= $price_min
                            AND t.received <= $price_max
                            )
                            OR
                            (t.currency = 'RMB'
                            AND t.total_profit/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) >= $profit_min
                            AND t.total_profit/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) <= $profit_max
                            AND t.expense/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) >= $cost_min
                            AND t.expense/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) <= $cost_max
                            AND t.received/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) >= $price_min
                            AND t.received/(SELECT exchange_rate_usd_rmb FROM GroupTour WHERE group_tour_id = t.group_tour_id) <= $price_max
                            ))
                        ";
        $sql_airticket = "SELECT
                                t.transaction_id, 
                                date_format(t.create_time, '%y-%m-%d') as create_time, 
                                t.currency, 
                                s.salesperson_code, 
                                t.total_profit, 
                                t.received AS revenue, 
                                t.expense, 
                                t.coupon,
                                cs.source_name, 
                                t.clear_status, 
                                t.lock_status, 
                                t.note
                            FROM Transactions t
                            JOIN CustomerSource cs ON t.source_id = cs.source_id
                            JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
                            WHERE t.transaction_id LIKE '$transaction_id'
                            AND t.type = 'airticket'
                            AND s.salesperson_code LIKE '$salesperson'
                            AND DATE_FORMAT(t.create_time, '%Y-%m-%d') <= $to_date
                            AND DATE_FORMAT(t.create_time, '%Y-%m-%d') >= $from_date
                            AND cs.source_name LIKE '$source'
                            AND t.payment_type LIKE '$payment_type'
                            AND
                            ((
                                t.currency = 'USD'
                                AND t.total_profit >= $profit_min
                                AND t.total_profit <= $profit_max
                                AND t.expense >= $cost_min
                                AND t.expense <= $cost_max
                                AND t.received>= $price_min
                                AND t.received <= $price_max
                                )
                                OR
                                (t.currency = 'RMB'
                                AND t.total_profit/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) >= $profit_min
                                AND t.total_profit/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) <= $profit_max
                                AND t.expense/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) >= $cost_min
                                AND t.expense/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) <= $cost_max
                                AND t.received/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) >= $price_min
                                AND t.received/(SELECT exchange_rate_usd_rmb FROM AirticketTour WHERE airticket_tour_id = t.airticket_tour_id) <= $price_max
                                ))
                            ";
        $sql = "SELECT * FROM (" . $sql_group . " UNION " . $sql_airticket. ") AS t WHERE 1";
        $sql .= $statusFilter;
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

$allOrderHistory = new AllOrderHistory();
if ($_GET['action'] == 'getHistoryOrder') {
    $result = $allOrderHistory->getHistoryOrder();
}

echo $result;


mysqli_close($conn);
?>
