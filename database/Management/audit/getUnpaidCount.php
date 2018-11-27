<?php
include('../../dbConnection.php');


$sql = "SELECT count(*)
        FROM FinanceStatus fs
        JOIN AuditProcess ap ON ap.fs_id = fs.fs_id
        WHERE status = 'pending'
        AND ap.cancel_request = 'paid'";
$result = $conn->query($sql);

echo $result->fetch_assoc()['count(*)'];

mysqli_close($conn);
?>
