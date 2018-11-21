<?php include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];
$group_name = $_SESSION["group_name"];

if ($group_name != 'normal') {
    $login_username = '%';
}


$offset = empty($_GET['offset']) ? 0 : $_GET['offset'];
$transaction_id = empty($_GET['transaction_id']) ? '%' : $_GET['transaction_id'];
$from_date = empty($_GET['from_date']) ? '%' : $_GET['from_date'];
$to_date = empty($_GET['to_date']) ? date('Y-m-d', strtotime(' +1 day')) : $_GET['to_date'];
$group_code = empty($_GET['group_code']) ? '%' : $_GET['group_code'];
$salesperson_code = $login_username;

$query = "SELECT
              t.transaction_id,
              t.create_time,
              g.group_code,
              concat(DATE_FORMAT(g.start_date, '%Y-%m-%d'), '/', DATE_FORMAT(g.end_date, '%Y-%m-%d')) AS schedule,
              t.payment_type,
              t.currency,
              t.total_profit,
              t.received,
              concat(t.expense, '(', g.reserve, '/', g.total_write_off, ')') AS cost,
              t.coupon,
              (SELECT process FROM ReceivedConfirmed r WHERE r.transaction_id = t.transaction_id) as process
          FROM GroupTour g
          JOIN Transactions t ON g.group_tour_id = t.group_tour_id
          JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
          WHERE t.transaction_id LIKE '$transaction_id'
          AND t.create_time >= '$from_date'
          AND t.create_time < '$to_date'
          AND g.group_code LIKE '$group_code'
          AND t.clear_status = 'N'
          AND t.lock_status = 'N'
          AND s.salesperson_code LIKE '$salesperson_code' ORDER BY t.transaction_id DESC LIMIT 15 OFFSET $offset";
// echo $query;
$result = $conn->query($query);

$res = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $res[] = $row;
    }
}

echo json_encode($res);

mysqli_close($conn);

?>
