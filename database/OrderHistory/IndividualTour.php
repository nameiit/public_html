<?php
include('../dbConnection.php');

class IndivOrderHistory {
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

        $salesperson = empty($_GET['salesperson']) ? '%' : $_GET['salesperson'];
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

        $total_number_min = empty($_GET['total_number_min']) ? '0' : $_GET['total_number_min'];
        $total_number_max = empty($_GET['total_number_max']) ? '999' : $_GET['total_number_max'];
        $group_name = empty($_GET['group_name']) ? '%' : $_GET['group_name'];
        $wholesaler = empty($_GET['wholesaler']) ? '%' : $_GET['wholesaler'];
        $start_date = empty($_GET['start_date']) ? '%' : $_GET['start_date'] . '%';
        $end_date = empty($_GET['end_date']) ? '%' : $_GET['end_date'] . '%';

        $sql = "SELECT
                    t.transaction_id,
                    DATE_FORMAT(t.create_time, '%Y-%m-%d') AS create_time,
                    s.salesperson_code,
                    t.currency,
                    t.total_profit,
                    t.received AS revenue,
                    t.expense AS cost,
                    t.coupon AS coupon,
                    cs.source_name,
                    t.clear_status,
                    t.lock_status,
                    t.note,
                    it.tour_name,
                    it.product_code,
                    concat(IFNULL(it.join_location, ''), '(', IFNULL(DATE_FORMAT(it.join_date, '%Y-%m-%d'), ''), ')', '~', IFNULL(it.leave_location, ''), '(', IFNULL(DATE_FORMAT(it.leave_date, '%Y-%m-%d'), ''), ')' ) AS schedule,
                    w.wholesaler_code,
                    it.indiv_tour_invoice AS invoice
                FROM IndividualTour it
                JOIN Transactions t
                ON t.indiv_tour_id = it.indiv_tour_id
                JOIN Salesperson s ON s.salesperson_id = it.salesperson_id
                JOIN Wholesaler w ON w.wholesaler_id = it.wholesaler_id
                JOIN CustomerSource cs ON cs.source_id = t.source_id
                WHERE t.transaction_id LIKE '$transaction_id'";
        $sql .= $statusFilter;
        $sql .= " AND DATE_FORMAT(t.create_time, '%Y-%m-%d') >= '$from_date'
                AND DATE_FORMAT(t.create_time, '%Y-%m-%d')  <= '$to_date'
                AND s.salesperson_code LIKE '$salesperson'
                AND cs.source_name LIKE '$source'
                AND it.product_code LIKE '$group_code'
                AND it.depart_date LIKE '$start_date'
                AND it.arrival_date LIKE '$end_date'
                AND it.tour_name LIKE '$group_name'
                AND w.wholesaler_code LIKE '$wholesaler'";
        if ($profit_currency == 'USD') {
            $sql .= " AND ((t.currency = 'USD' 
                            AND t.total_profit >= $profit_min 
                            AND t.total_profit <= $profit_max) 
                            OR 
                            (t.currency = 'RMB' 
                            AND t.total_profit <= $profit_max / it.exchange_rate 
                            AND t.total_profit >= $profit_min / it.exchange_rate)
                          )";
        } else {
            $sql .= " AND ((t.currency = 'USD' 
                            AND t.total_profit * it.exchange_rate >= $profit_min 
                            AND t.total_profit * it.exchange_rate <= $profit_max) 
                            OR 
                            (t.currency = 'RMB' 
                            AND t.total_profit <= $profit_max 
                            AND t.total_profit >= $profit_min)
                            )";        
        }
        if ($price_currency == 'USD') {
            $sql .= " AND ((it.sale_currency = 'USD' 
                            AND it.received >= $price_min 
                            AND it.received <= $price_max) 
                            OR 
                            (it.sale_currency = 'RMB' 
                            AND it.received >= $price_min / it.exchange_rate 
                            AND it.received <= $price_max / it.exchange_rate)
                          )";        
        } else {
            $sql .= " AND ((it.sale_currency = 'USD' 
                            AND it.received * it.exchange_rate >= $price_min 
                            AND it.received * it.exchange_rate <= $price_max) 
                            OR 
                            (it.sale_currency = 'RMB' 
                            AND it.received >= $price_min
                            AND it.received <= $price_max)
                          )";  
        }
        if ($cost_currency == 'USD') {
            $sql .= " AND ((it.base_currency = 'USD' 
                            AND it.base_price >= $cost_min 
                            AND it.base_price <= $cost_max) 
                            OR 
                            (it.base_currency = 'RMB' 
                            AND it.base_price >= $cost_min / it.exchange_rate 
                            AND it.base_price <= $cost_max / it.exchange_rate)
                          )"; 
        } else {
            $sql .= " AND ((it.base_currency = 'USD' 
                            AND it.base_price * it.exchange_rate >= $cost_min 
                            AND it.base_price * it.exchange_rate <= $cost_max) 
                            OR 
                            (it.base_currency = 'RMB' 
                            AND it.base_price >= $cost_min 
                            AND it.base_price <= $cost_max)
                          )"; 
        }

        $sql .= " ORDER BY t.transaction_id DESC";
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

$indivOrder = new IndivOrderHistory();
if ($_GET['action'] == 'getHistoryOrder') {
    $result = $indivOrder->getHistoryOrder();
}

echo $result;


mysqli_close($conn);
?>
