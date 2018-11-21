<?php include('dbConnection.php');

$couponCode = $_POST['couponCode'];
$couponValue = "";
$couponStatus = "";
$couponCurrency = "";

$query = "SELECT discount, code_expired, currency FROM CouponCode WHERE code = '$couponCode'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $couponValue = $row['discount'];
        $couponStatus = $row['code_expired'];
        $couponCurrency = $row['currency'];
    }
} else {
    return "";
}

if ($couponStatus == 'Y') {
    echo 'Expired';
} else {
    echo $couponValue . ' ' . $couponCurrency;
}

mysqli_close($conn);
 ?>
