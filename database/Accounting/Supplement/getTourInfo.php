<?php
include('../../dbConnection.php');

$transaction_id = $_GET['transaction_id'];
$product_code = empty($_GET['product_code']) ? '%' : $_GET['product_code'];

$sql = "SELECT
            t.transaction_id,
            IFNULL(REPLACE(REPLACE(fs.ending, 'sup', '增补'), 'ref', '退款'), '订单') AS type,
            i.product_code,
            fs.total_profit,
            fs.selling_price,
            fs.received,
            fs.debt,
            fs.debt_cleared, 
            concat(UPPER(c.fname), '/', c.lname) AS customer_name, 
            w.wholesaler_code, 
            fs.invoice
        FROM Transactions t
        JOIN FinanceStatus fs ON t.transaction_id = fs.transaction_id
        JOIN IndividualTour i ON t.indiv_tour_id = i.indiv_tour_id
        JOIN Wholesaler w ON w.wholesaler_id = i.wholesaler_id
        JOIN Customer c ON i.customer_id = c.customer_id
        WHERE t.transaction_id LIKE '$transaction_id'
        AND i.product_code LIKE '$product_code'
        AND t.type = 'individual'";
$result = $conn->query($sql);

$res = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $res[] = $row;
    }
}

echo json_encode($res);

mysqli_close($conn);
 ?>
