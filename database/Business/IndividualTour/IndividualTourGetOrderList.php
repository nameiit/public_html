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
$product_code = empty($_GET['product_code']) ? '%' : $_GET['product_code'];
$salesperson_code = $login_username;

$query = "SELECT
            fs.transaction_id,
            fs.invoive,
            fs.total_profit,
            concat(fs.clear_status, '|', debt) AS debt,
            REPLACE(REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC'), 'N|CC', 'CC') AS received,
            fs.selling_price,
            fs.create_time,
            fs.depart_date,
            fs.arrival_date,
            fs.lock_status,
            fs.finish_status,
            fs.following_id_collection
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
          -- invoice加一下
          AND w.wholesaler_code LIKE '$wholesaler'
          AND fs.lock_status LIKE '$lock_status'
          AND fs.clear_status LIKE '$clear_status'
          AND fs.paid_status LIKE '$paid_status'
          AND fs.finish_status LIKE '$finish_status'
          ORDER BY t.transaction_id DESC
          LIMIT 15 OFFSET $offset";

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
