<?php include('../../dbConnection.php');

$transactionId = $_POST['transactionId'];

$query = "SELECT airticket_tour_id FROM Transactions WHERE transaction_id = $transactionId";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $airticket_tour_id = $result->fetch_assoc()['airticket_tour_id'];
}

$itinerary = $_POST['itinerary'];
$salesperson = $_POST['salesperson'];
$locator = $_POST['locator'];
$flight_code = $_POST['flight_code'];
$round_trip = $_POST['round_trip'];
$ticket_type = $_POST['ticket_type'];
$total_number = $_POST['total_number'];
$wholesaler = empty($_POST['wholesaler'])? 'unknown' : $_POST['wholesaler'];
$invoice = $_POST['invoice'];
$source = empty($_POST['source'])? 'unknown' : $_POST['source'];
$note = (empty($_POST['note']))? NULL : $_POST['note'];

$exchange_rate = $_POST['exchange_rate'];
$payment_area = $_POST['payment_area'];
$sell_price = $_POST['sell_price'];
$sell_price_currency = $_POST['sell_price_currency'];
$base_price = $_POST['base_price'];
$base_price_currency = $_POST['base_price_currency'];
$payment_type = $_POST['payment_type'];
$profit = $_POST['profit'];
$profit_currency = $_POSt['profit_currency'];

$mco_value = empty($_POST['mco_value'])? 0 : $_POST['mco_value'];
$mco_currency = $_POST['mco_currency'];
$mco_credit = empty($_POST['mco_credit'])? 0 : $_POST['mco_credit'];
$mco_credit_currency = $_POST['mco_credit_currency'];
if ($mco_currency == 'RMB') {
  $mco_value = $mco_value / $exchange_rate;
}
if ($mco_credit_currency == 'RMB') {
  $mco_credit = $mco_credit / $exchange_rate;
}


$passenger_list = $_POST['passenger_list'];
$adult_number = $_POST['adult_number'];
$youth_number = $_POST['youth_number'];
$children_number = $_POST['children_number'];
$infant_number = $_POST['infant_number'];

$phone = $_POST['phone'];
$email = $_POST['email'];
$birthday = $_POST['birthday'];
$gender = $_POST['gender'];
$otherContact = $_POST['otherContact'];
$otherContactNumber = (empty($_POST['other_contact_number']))? NULL : $_POST['other_contact_number'];
$zipcode = (empty($_POST['zipcode']))? NULL : $_POST['zipcode'];


$flight_number = json_decode($_POST['flight_number']);
$leave_date = json_decode($_POST['leave_date']);
$schedule = json_decode($_POST['schedule']);

$customer_name = explode(";", $passenger_list)[0];
$firstName = explode("/", $customer_name)[1];
$lastName = explode("/", $customer_name)[0];




// 从这里开始，到最后结束
$query = "SELECT customer_id
          FROM Customer
          WHERE fname = '$firstName'
          AND lname = '$lastName'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $customer_id = $result->fetch_assoc()['customer_id'];
    # 更新已有的客户信息
    $query = "UPDATE
                Customer
              SET
                fname = '$firstName',
                lname = '$lastName',
                phone = '$phone',
                email = '$email'";
    if ($birthday != "") $query .= ", birth_date = '$birthday'";
    if ($otherContact != "") $query .= ", other_contact_type = '$otherContact'";
    if ($otherContactNumber != "") $query .= ", other_contact_number = '$otherContactNumber'";
    if ($gender != "") $query .= ", gender = '$gender'";
    if ($zipcode != "") $query .= ", zipcode = '$zipcode'";
    $query .= " where customer_id = $customer_id";
    $conn->query($query);
} else {
    # 添加新的客户信息
    $query = "INSERT INTO Customer";
    $columnName = "(fname, lname";
    if ($birthday != "") $columnName .= ", birthday";
    if ($email != "") $columnName .= ", email";
    if ($phone != "") $columnName .= ", phone";
    if ($otherContact != "") $columnName .= ", other_contact_type";
    if ($otherContactNumber != "") $columnName .= ", other_contact_number";
    if ($gender != "") $columnName .= ", gender";
    if ($zipcode != "") $columnName .= ", zipcode";
    $columnName .= ")";
    $query .= $columnName;
    $query .= " VALUES ('$firstName', '$lastName'";
    if ($birthday != "") $query .= ", '$birthday'";
    if ($email != "") $query .= ", '$email'";
    if ($phone != "") $query .= ", '$phone'";
    if ($otherContact != "") $query .= ", '$otherContact'";
    if ($otherContactNumber != "") $query .= ", '$otherContactNumber'";
    if ($gender != "") $query .= ", '$gender'";
    if ($zipcode != "") $query .= ", '$zipcode'";
    $query .= ")";
    $result = $conn->query($query);

    $query = "SELECT customer_id from Customer WHERE fname = '$firstName' AND lname = '$lastName'";
    $result = $conn->query($query);
    $customerId = $result->fetch_assoc()['customer_id'];
}


$sql = "DELETE FROM AirScheduleIntegrated WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($sql);

$sql = "DELETE FROM AirSchedule WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($sql);

// Update AirTicket table
$query = "UPDATE
            AirTicketTour
          SET
            itinerary = '$itinerary',
            salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
            locators = '$locator',
            invoice = '$invoice',
            flight_code = '$flight_code',
            round_trip = '$round_trip',
            ticket_type = '$ticket_type',
            passenger_name = '$passenger_list',
            adult_number = $adult_number,
            child_number = $children_number,
            infant_number = $infant_number,
            wholesaler_id = (SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code LIKE '$wholesaler'),
            ta_id = (SELECT ta_id FROM TravelAgency WHERE agency_name LIKE '$agency_name'),
            customer_id = $customer_id,
            ta_id = (SELECT ta_id FROM TravelAgency WHERE agency_name = '$agency_name'),
            sale_price = '$sell_price',
            sale_currency = '$sell_price_currency',
            base_price = '$base_price',
            base_currency = '$base_price_currency',
            commission_fee = '$transaction_fee',
            received = '$actual_received',
            received2 = '$receive2',
            received2_currency = '$received2_currency',
            received2_source = '$receive2_source'
          WHERE
            airticket_tour_id = $airticket_tour_id";
$conn->query($query);


if ($couponId == NULL && $discount != NULL) {
  $query = "UPDATE
              AirTicketTour
            SET
              cc_id = NULL,
              coupon = '$discount',
              coupon_currency = '$discount_currency'
            WHERE
              airticket_tour_id = $airticket_tour_id";
} else if ($discount == NULL) {
  $query = "UPDATE
              AirTicketTour
            SET
              cc_id = NULL,
              coupon = NULL,
              coupon_currency = NULL
            WHERE
              airticket_tour_id = $airticket_tour_id";
} else {
  $query = "UPDATE
              AirTicketTour
            SET
              cc_id = '$couponId',
              coupon = '$discount'
              coupon_currency = '$discount_currency'
            WHERE
              airticket_tour_id = $airticket_tour_id";
}
$conn->query($query);

for ($i = 0; $i < sizeof($flight_number); $i++) {
    $leave_airport = explode("-", $schedule[$i])[0];
    $arrive_airport = explode("-", $schedule[$i])[1];
    $query = "INSERT INTO AirSchedule (airticket_tour_id, depart_airport, arrival_airport, depart_date, flight_number)
              VALUES ('$airticket_tour_id', '$leave_airport', '$arrive_airport', '$leave_date[$i]', '$flight_number[$i]')";
    $conn->query($query);
}

$query = "UPDATE
            Transactions
          SET
            salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
            payment_type = '$payment_type',
            source_id = (SELECT source_id FROM CustomerSource WHERE source_name = '$source'),
            note = '$note'
          WHERE transaction_id = $transactionId";
$conn->query($query);

mysqli_close($conn);
?>
