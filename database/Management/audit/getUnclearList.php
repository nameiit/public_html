<?php
include('../../dbConnection.php');

$offset = $_GET['offset'];
$sql = "SELECT
            ap.ap_id,
            concat(fs.transaction_id, IFNULL(fs.ending, '')) AS transaction_id,
            fs.invoice,
            fs.total_profit,
            concat(fs.clear_status, '|', debt) AS debt,
            REPLACE(REPLACE(concat(fs.paid_status, '|', fs.received), 'Y|CC', 'CC'), 'N|CC', 'CC') AS received,
            fs.selling_price,
            fs.create_time,
            fs.depart_date,
            fs.arrival_date,
            fs.lock_status,
            fs.finish_status
        FROM FinanceStatus fs
        JOIN AuditProcess ap ON ap.fs_id = fs.fs_id
        WHERE status = 'pending'
        AND ap.cancel_request = 'clear' ORDER BY ap.ap_id DESC
        LIMIT 10 OFFSET $offset";
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
