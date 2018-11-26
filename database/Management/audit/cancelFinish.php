<?php
include('../../dbConnection.php');

$apIdList = "";

//这里要用到ap_id，就是AuditProcess的PK，每行都有一个，我在getRequestList里取了，不造能不能拿到。


for ($i = 0; i < sizeof($apIdList); $i++) {
    $ap_id = $apIdList[$i];
    
    // 取消LOCK按键    
    $sql = "UPDATE FinanceStatus 
            SET finish_status = 'N'
            WHERE fs_id = (SELECT fs_id FROM AuditProcess WHERE ap_id = '$ap_id')";
    $conn->query($sql);
    $sql = "UPDATE AuditProcess SET status = 'closed' WHERE ap_id = '$ap_id'";
    $conn->query($sql);

    // 驳回按键
    $sql = "UPDATE AuditProcess SET status = 'denied' WHERE ap_id = '$ap_id'";
}

mysqli_close($conn);
?>