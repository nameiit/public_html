<?php
include('../../dbConnection.php');


$sql = "SELECT count(*)
        FROM FinanceStatus fs
        JOIN AuditProcess ap ON ap.fs_id = fs.fs_id
        WHERE status = 'pending'";
        
$sql_lock = $sql . " AND ap.cancel_request = 'lock'";
$sql_clear = $sql . " AND ap.cancel_request = 'clear'";
$sql_paid = $sql . " AND ap.cancel_request = 'paid'";
$sql_finish = $sql . " AND ap.cancel_request = 'finish'";



mysqli_close($conn);
?>