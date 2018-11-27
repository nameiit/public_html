<?php
include('../../dbConnection.php');

$apIdList = json_decode($_POST['ap_id_list']);

for ($i = 0; $i < sizeof($apIdList); $i++) {
    $ap_id = $apIdList[$i];
    $sql = "UPDATE AuditProcess SET status = 'denied' WHERE ap_id = '$ap_id'";
    $conn->query($sql);
}

mysqli_close($conn);
?>
