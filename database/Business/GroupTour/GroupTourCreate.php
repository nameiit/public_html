<?php include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$groupTourId = $_POST['groupNum'];
$invoice = $_POST['invoice'];
$flightNum = empty($_POST['flightNum'])? NULL : $_POST['flightNum'];
$busCompany = empty($_POST['busCompany'])? NULL : $_POST['busCompany'];
$salesperson_code = $_POST['salespersonInput'];
$groupTourSource = empty($_POST['groupTourSource'])? 'unknown' : $_POST['groupTourSource'];
$leaderNumber = $_POST['leaderNumber'];
$visitorNumber = $_POST['visitorNumber'];
$note = $_POST['note'];

$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$duration = $_POST['duration'];

$exchange_rate = $_POST['exchange_rate'];

$reserve = $_POST['reserve'];
$reserve_currency = $_POST['reserve_currency'];
$total_cost = $_POST['total_cost'];
$total_cost_currency = $_POST['total_cost_currency'];
$total_write_off = $_POST['total_write_off'];

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

if (!is_numeric($coupon) and $coupon != "") {
    $couponId = "";
    $couponValue = "";
    $couponStatus = "";
    $couponCurrency = "";

    $query = "SELECT cc_id, discount, code_expired, currency FROM CouponCode WHERE code = '$coupon'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $couponId = $row['cc_id'];
            $couponValue = $row['discount'];
            $couponStatus = $row['code_expired'];
            $couponCurrency = $row['currency'];
        }
    }
    $groupTourInsertSql = "INSERT INTO GroupTour(
        group_code,
        flight_number,
        bus_company,
        salesperson_id,
        leader_number,
        tourist_number,
        start_date,
        end_date,
        duration,
        exchange_rate_usd_rmb,
        cc_id,
        coupon,
        coupon_currency,
        total_cost,
        total_cost_currency,
        reserve,
        reserve_currency,
        group_tour_invoice)
        VALUES(
            '$groupTourId',
            '$flightNum',
            '$busCompany',
            (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson_code'),
            '$leaderNumber',
            '$visitorNumber',
            '$startTime',
            '$endTime',
            '$duration',
            '$exchange_rate',
            '$couponId',
            '$couponValue',
            '$couponCurrency',
            '$total_cost',
            '$total_cost_currency',
            '$reserve',
            '$reserve_currency',
            '$invoice'
        )";
} else if (is_numeric($coupon)){
  $groupTourInsertSql = "INSERT INTO GroupTour(
      group_code,
      flight_number,
      bus_company,
      salesperson_id,
      leader_number,
      tourist_number,
      start_date,
      end_date,
      duration,
      exchange_rate_usd_rmb,
      coupon,
      coupon_currency,
      total_cost,
      total_cost_currency,
      reserve,
      reserve_currency,
      group_tour_invoice)
      VALUES(
          '$groupTourId',
          '$flightNum',
          '$busCompany',
          (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson_code'),
          '$leaderNumber',
          '$visitorNumber',
          '$startTime',
          '$endTime',
          '$duration',
          '$exchange_rate',
          '$coupon',
          '$coupon_currency',
          '$total_cost',
          '$total_cost_currency',
          '$reserve',
          '$reserve_currency',
          '$invoice'
      )";
} else {
  $groupTourInsertSql = "INSERT INTO GroupTour(
      group_code,
      flight_number,
      bus_company,
      salesperson_id,
      leader_number,
      tourist_number,
      start_date,
      end_date,
      duration,
      exchange_rate_usd_rmb,
      coupon,
      total_cost,
      total_cost_currency,
      reserve,
      reserve_currency,
      group_tour_invoice)
      VALUES(
          '$groupTourId',
          '$flightNum',
          '$busCompany',
          (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson_code'),
          '$leaderNumber',
          '$visitorNumber',
          '$startTime',
          '$endTime',
          '$duration',
          '$exchange_rate',
          0,
          '$total_cost',
          '$total_cost_currency',
          '$reserve',
          '$reserve_currency',
          '$invoice'
      )";
}
$groupTourInsertResult = $conn->query($groupTourInsertSql);

$sql = "SELECT max(group_tour_id) as gt_id FROM GroupTour WHERE salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson_code')";
$result = $conn->query($sql);
$group_tour_id = $result->fetch_assoc()['gt_id'];

for ($i = 0; $i < sizeof($price); $i++) {
    $sql = "INSERT INTO GroupTourReceived
                (group_tour_id, received, received_currency, payment_type, payment_amount, commission_fee)
            VALUES
                ($group_tour_id, $actual_received[$i], '$price_currency[$i]', '$payment_type[$i]', '$price[$i]', '$transaction_fee[$i]')";
    $conn->query($sql);
}

for ($i = 0; $i < sizeof($tourGuidePhone); $i++) {
  $fname = explode(" ", $tourGuideName[$i])[0];
  $lname = explode(" ", $tourGuideName[$i])[1];

  $sql = "UPDATE TouristGuide SET phone = '$tourGuidePhone[$i]' WHERE fname = '$fname' AND lname = '$lname'";
  $conn->query($sql);
}

$salespersonId = "";
$query = "SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson_code'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $salespersonId = $row['salesperson_id'];
    }
}

for ($i = 0; $i < sizeof($tourGuideName); $i++) {
  $fname = explode(" ", $tourGuideName[$i])[0];
  $lname = explode(" ", $tourGuideName[$i])[1];

  $sql = "INSERT INTO
            GroupTourGuideDetails (guide_id, group_tour_id, write_off, write_off_currency)
          VALUES (
            (SELECT guide_id FROM TouristGuide WHERE fname = '$fname' AND lname = '$lname'),
            $group_tour_id,
            '$write_off[$i]',
            '$write_off_currency[$i]'
          )";
  $conn->query($sql);
}

$transactionsInsertSql = "INSERT INTO Transactions(
        type,
        lock_status,
        clear_status,
        group_tour_id,
        salesperson_id,
        payment_type,
        note,
        create_time,
        source_id,
        settle_time)
    VALUES(
        'group',
        'N',
        'N',
        (SELECT group_tour_id FROM GroupTour WHERE group_code = '$groupTourId' AND
        salesperson_id = '$salespersonId' ORDER BY group_tour_id DESC LIMIT 1),
        '$salespersonId',
        '$paymentType',
        '$note',
        current_timestamp,
        (SELECT source_id FROM CustomerSource WHERE source_name = '$groupTourSource'),
        '$endTime'
    )";
$transactionsInsertResult = $conn->query($transactionsInsertSql);

$sql = "SELECT max(transaction_id) AS transaction_id FROM Transactions WHERE salesperson_id = '$salespersonId';";
$result = $conn->query($sql);
$transactionId = $result->fetch_assoc()['transaction_id'];
$sql = "INSERT INTO LogLastEditor(transaction_id, user_id) VALUES($transactionId, (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'));";
$conn -> query($sql);


for ($i = 0; $i < sizeof($wholesaler); $i++) {
  $sql = "INSERT INTO WholesalerCollection (wholesaler_id, group_tour_id)
          VALUES ((SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$wholesaler[$i]'), $group_tour_id)";
  $conn->query($sql);
}

echo $group_tour_id;
mysqli_close($conn);
?>
