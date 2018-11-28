<?php
include('../../dbConnection.php');

$fs_id_list = json_decode($_POST['fs_id_list']);
$invoice = $_POST['invoice'];
$debt = $_POST['debt'];
$receive = $_POST['receive'];
$selling_price = $_POST['selling_price'];
$check_no = $_POST['check_no'];

//更新多行
for ($i = 0; $i < sizeof(fs_id_list); $i++) {
  // $sql = "UPDATE ......";
  // $conn->query($sql);
}

mysqli_close($conn);
 ?>
