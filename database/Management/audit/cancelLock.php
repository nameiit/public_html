<?php
include('../../dbConnection.php');

$apIdList = json_decode($_POST['ap_id_list']);

for ($i = 0; $i < sizeof($apIdList); $i++) {
    $ap_id = $apIdList[$i];

    // 取消LOCK按键
    $sql = "UPDATE FinanceStatus
            SET lock_status = 'N',
            clear_status = 'N',
            debt_cleared = 0
            WHERE fs_id = (SELECT fs_id FROM AuditProcess WHERE ap_id = '$ap_id')";
    $conn->query($sql);
    $sql = "UPDATE AuditProcess SET status = 'closed' WHERE ap_id = '$ap_id'";
    $conn->query($sql);
}

mysqli_close($conn);
?>
