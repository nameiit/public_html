<?php
include('../../dbConnection.php');
session_start();
$login_username = $_SESSION["username"];
$transactionId = $_POST['transactionId'];

// Get group code
$query = "SELECT group_tour_id FROM Transactions WHERE transaction_id = '$transactionId'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $group_tour_id = $result->fetch_assoc()['group_tour_id'];
} else {
    return "Group tour order not exist";
}

$group_code = $_POST['group_code'];
$invoice = empty($_POST['invoice']) ? '': $_POST['invoice'];
$flight_number = empty($_POST['flight_number']) ? '': $_POST['flight_number'];
$bus_company = empty($_POST['bus_company']) ? '': $_POST['bus_company'];
$salesperson = $_POST['salesperson'];
$source = $_POST['source'];
$leader_number = $_POST['leader_number'];
$visitor_number = $_POST['visitor_number'];
$note = $_POST['note'];

$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$duration = $_POST['duration'];

$payment_type = $_POST['payment_type'];

$reserve = $_POST['reserve'];
$reserve_currency = $_POST['reserve_currency'];
$total_cost = $_POST['total_cost'];
$total_cost_currency = $_POST['total_cost_currency'];

$coupon = $_POST['coupon'];
$coupon_currency = $_POST['coupon_currency'];

$wholesaler = json_decode($_POST['wholesaler']);
$tourGuideName = json_decode($_POST['tourGuide']);
$tourGuidePhone = json_decode($_POST['guideTel']);
$write_off = json_decode($_POST['write_off']);
$write_off_currency = json_decode($_POST['write_off_currency']);
$price = json_decode($_POST['price']);
$price_currency = json_decode($_POST['price_currency']);
$payment_type = json_decode($_POST['payment_type']);
$transaction_fee = json_decode($_POST['transaction_fee']);
$actual_received = json_decode($_POST['actual_received']);


$sql = "DELETE FROM GroupTourGuideDetails WHERE group_tour_id = '$group_tour_id'";
$conn->query($sql);
$sql = "DELETE FROM GroupTourReceived WHERE group_tour_id = '$group_tour_id'";
$conn->query($sql);
$sql = "UPDATE GroupTour SET total_write_off = 0, received=0 WHERE group_tour_id = '$group_tour_id'";
$conn->query($sql);


for ($i = 0; $i < sizeof($tourGuideName); $i++) {
  $fname = explode(" ", $tourGuideName[$i])[0];
  $lname = explode(" ", $tourGuideName[$i])[1];

  $sql = "UPDATE TouristGuide SET phone = '$tourGuidePhone[$i]' WHERE fname = '$fname' AND lname = '$lname'";
  $conn->query($sql);
}

if (empty($coupon)) {
  $query = "UPDATE GroupTour
            SET
              group_code = '$group_code', group_tour_invoice = '$invoice', flight_number = '$flight_number', bus_company = '$bus_company',
              salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
              leader_number = $leader_number, tourist_number = $visitor_number,
              start_date = '$start_date', end_date = '$end_date', duration = $duration,
              reserve = '$reserve', reserve_currency = '$reserve_currency',
              total_cost = '$total_cost', total_cost_currency = '$total_cost_currency', coupon = 0,
              coupon_currency = (SELECT currency FROM Transactions WHERE group_tour_id = '$group_tour_id')
            WHERE group_tour_id = '$group_tour_id'";
} else {
    if (!is_numeric($coupon)) {
        $couponId = "";
        $couponValue = "";
        $couponCurrency = "";

        $query = "SELECT cc_id, discount, code_expired, currency FROM CouponCode WHERE code = '$coupon'";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $couponId = $row['cc_id'];
                $couponValue = $row['discount'];
                $couponCurrency = $row['currency'];
            }
        }

        $query = "UPDATE GroupTour
                  SET
                    group_code = '$group_code', group_tour_invoice = '$invoice', flight_number = '$flight_number', bus_company = '$bus_company',
                    salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
                    leader_number = $leader_number, tourist_number = $visitor_number,
                    start_date = '$start_date', end_date = '$end_date', duration = $duration,
                    reserve = '$reserve', reserve_currency = '$reserve_currency',
                    total_cost = '$total_cost', total_cost_currency = '$total_cost_currency', cc_id = $couponId, coupon = $couponValue,
                    coupon_currency = '$couponCurrency'
                  WHERE group_tour_id = '$group_tour_id'";
    } else if (is_numeric($coupon)) {
      $query = "UPDATE GroupTour
                SET
                  group_code = '$group_code', group_tour_invoice = '$invoice', flight_number = '$flight_number', bus_company = '$bus_company',
                  salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
                  leader_number = $leader_number, tourist_number = $visitor_number,
                  start_date = '$start_date', end_date = '$end_date', duration = $duration,
                  reserve = '$reserve', reserve_currency = '$reserve_currency',
                  total_cost = '$total_cost', total_cost_currency = '$total_cost_currency', cc_id = NULL, coupon = $coupon,
                  coupon_currency = '$coupon_currency'
                WHERE group_tour_id = '$group_tour_id'";
    }
}
$result = $conn->query($query);

for ($i = 0; $i < sizeof($tourGuideName); $i++) {
  $fname = explode(" ", $tourGuideName[$i])[0];
  $lname = explode(" ", $tourGuideName[$i])[1];

  $sql = "INSERT INTO GroupTourGuideDetails
              (guide_id, group_tour_id, write_off, write_off_currency)
          VALUES (
            (SELECT guide_id FROM TouristGuide WHERE fname = '$fname' AND lname = '$lname'),
            '$group_tour_id',
            '$write_off[$i]',
            '$write_off_currency[$i]'
          )";
  $conn->query($sql);
}

for ($i = 0; $i < sizeof($price); $i++) {
  $sql = "INSERT INTO GroupTourReceived
            (group_tour_id, received, received_currency, payment_type, payment_amount, commission_fee)
          VALUES
            ('$group_tour_id', '$actual_received[$i]', '$price_currency[$i]', '$payment_type[$i]', '$price[$i]', '$transaction_fee[$i]')";
  $conn->query($sql);
}

$query = "UPDATE LogLastEditor SET user_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username') WHERE transacion_id = '$transactionId';";
$conn->query($query);


$query = "UPDATE Transactions
          SET
            salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
            source_id = (SELECT source_id FROM CustomerSource WHERE source_name = '$source'),
            note = '$note'
            WHERE groups_tour_id = '$group_tour_id'";
$result = $conn->query($query);

$sql = "DELETE FROM WholesalerCollection WHERE group_tour_id = $group_tour_id";
$conn->query($sql);

for ($i = 0; $i < sizeof($wholesaler); $i++) {
  $sql = "INSERT INTO WholesalerCollection (wholesaler_id, group_tour_id)
          VALUES ((SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$wholesaler[$i]'), $group_tour_id)";
  $conn->query($sql);
}

mysqli_close($conn);
?>
