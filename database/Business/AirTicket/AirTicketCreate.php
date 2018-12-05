<?php include('../../dbConnection.php');

$itinerary = $_POST['itinerary'];

$salesperson = $_POST['salesperson'];
$locator = $_POST['locator'];
$air_company_code = $_POST['air_company_code'];
$roundTrip = $_POST['roundTrip'];
$ticketType = $_POST['ticketType'];
$numPassenger = $_POST['numPassenger'];
$wholesaler = empty($_POST['wholesaler'])? 'unknown' : $_POST['wholesaler'];
$ticketedTime = $_POST['ticketed_time'];
$confirmPaymentTime = empty($_POST['confirm_payment_time']) ? 'KSH' : $_POST['confirm_payment_time'];
$invoice = $_POST['invoice'];
$source = empty($_POST['source'])? 'unknown' : $_POST['source'];
$note = $_POST['note'];

$exchange_rate = empty($_POST['exchange_rate'])? 'nothing' : $_POST['exchange_rate'];
$payment_area = $_POST['payment_area'];
$sell_price = $_POST['sell_price'];
$sell_price_currency = $_POST['sell_price_currency'];
$base_price = $_POST['base_price'];
$base_price_currency = $_POST['base_price_currency'];
$payment_type = $_POST['payType'];
$profit = $_POST['profit'];
$profit_currency = $_POST['profit_currency'];

$numOfAdult = $_POST['numOfAdult'];
$numOfYouth = $_POST['numOfYouth'];
$numOfChildren = $_POST['numOfChildren'];
$numOfInfant = $_POST['numOfBaby'];

$phone = $_POST['phone'];
$email = $_POST['email'];
$otherContact = $_POST['otherContact'];
$otherContactNumber = $_POST['otherContactNumber'];
$birthday = $_POST['birthday'];
$gender = $_POST['gender'];
$zipcode = $_POST['zipcode'];


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


$flight_number = json_decode($_POST['flight_number']);
$leave_date = json_decode($_POST['leave_date']);
$schedule = json_decode($_POST['schedule']);


$passenger_list = json_decode($_POST['passenger_list']);
$ticket_number = json_decode($_POST['ticket_number']);
$passenger_type = json_decode($_POST['passenger_type']);

$firstName = explode("/", $passenger_list[0])[1];
$lastName = explode("/", $passenger_list[0])[0];

$customerId = "";
$query = "SELECT customer_id
          From Customer
          WHERE fname = '$firstName'
          AND lname = '$lastName'";
$result = $conn->query($query);
if ($result->num_rows == 0) {
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
} else {
    $customerId = $result->fetch_assoc()['customer_id'];
}


// 得到销售id
$salespersonId = "";
$query = "SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'";
$result = $conn->query($query);
$salespersonId = $result->fetch_assoc()['salesperson_id'];

if ($exchange_rate == 'nothing') {
  $query = "INSERT INTO AirticketTour
          (
            flight_code,
            salesperson_id,
            locators,
            round_trip,
            ticket_type,
            adult_number,
            youth_number,
            child_number,
            infant_number,
            itinerary,
            invoice,
            selling_price,
            selling_currency,
            base_price,
            base_currency,
            wholesaler_id,
            deal_location,
            payment_type,
            ticketed_date,
            customer_id
          ) VALUES (
            '$air_company_code',
            '$salespersonId',
            '$locator',
            '$roundTrip',
            '$ticketType',
            '$numOfAdult',
            '$numOfYouth',
            '$numOfChildren',
            '$numOfInfant',
            '$itinerary',
            '$invoice',
            '$sell_price',
            '$sell_price_currency',
            '$base_price',
            '$base_price_currency',
            IFNULL((SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$wholesaler'), (SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = 'unknown')),
            '$payment_area',
            '$payment_type',
            '$ticketedTime',
            '$customerId'
          )";
} else {
  $query = "INSERT INTO AirticketTour
          (
            flight_code,
            salesperson_id,
            locators,
            round_trip,
            ticket_type,
            adult_number,
            youth_number,
            child_number,
            infant_number,
            itinerary,
            invoice,
            exchange_rate_usd_rmb,
            selling_price,
            selling_currency,
            base_price,
            base_currency,
            wholesaler_id,
            deal_location,
            payment_type,
            ticketed_date
          ) VALUES (
            '$air_company_code',
            '$salespersonId',
            '$locator',
            '$roundTrip',
            '$ticketType',
            '$numOfAdult',
            '$numOfYouth',
            '$numOfChildren',
            '$numOfInfant',
            '$itinerary',
            '$invoice',
            '$exchange_rate',
            '$sell_price',
            '$sell_price_currency',
            '$base_price',
            '$base_price_currency',
            IFNULL((SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$wholesaler'), (SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = 'unknown')),
            '$payment_area',
            '$payment_type',
            '$ticketedTime'
          )";
}
// echo $query;
$conn->query($query);

$query = "SELECT max(airticket_tour_id) FROM AirticketTour
          WHERE salesperson_id = '$salespersonId'";
$result = $conn->query($query);
$airticket_tour_id = $result->fetch_assoc()['max(airticket_tour_id)'];

// 票号
for ($i = 0; $i < sizeof($passenger_list); $i++) {
  $firstName = explode("/", $passenger_list[$i])[1];
  $lastName = explode("/", $passenger_list[$i])[0];
  $customerType = $passenger_type[$i];
  $ticketNumber = $ticket_number[$i];
  $sql = "INSERT INTO AirticketNumber (fname, lname, customer_type, airticket_number, airticket_tour_id)
          VALUES ('$firstName', '$lastName', '$customerType', '$ticketNumber', $airticket_tour_id)";
  $conn->query($sql);
}

for ($i = 0; $i < sizeof($flight_number); $i++) {
    $leave_airport = explode("-", $schedule[$i])[0];
    $arrive_airport = explode("-", $schedule[$i])[1];
    $airline = substr($flight_number[$i], 0, 2);
    $query = "INSERT INTO AirSchedule (
                airticket_tour_id, depart_airport, arrival_airport, depart_date, flight_number, airline
              ) VALUES (
                '$airticket_tour_id', '$leave_airport', '$arrive_airport', '$leave_date[$i]', '$flight_number[$i]', '$airline'
              )";
    $conn->query($query);
}

$base_price_trans = $base_price;
$sell_price_trans = $sell_price;
$profit_trans = $profit;
if ($base_price_currency == 'RMB') {
  $base_price_trans = $base_price / $exchange_rate;
}
if ($sell_price_currency == 'RMB') {
  $sell_price_trans = $sell_price / $exchange_rate;
}
if ($profit_currency == 'RMB') {
  $profit_trans = $profit / $exchange_rate;
}

$transactionsInsertSql = "INSERT INTO Transactions(
                              type,
                              airticket_tour_id,
                              create_time,
                              source_id,
                              note,
                              settle_time,
                              expense,
                              received,
                              total_profit,
                              currency,
                              confirm_payment_time
                          ) VALUES (
                              'airticket',
                              '$airticket_tour_id',
                              current_timestamp,
                              IFNULL((SELECT source_id FROM CustomerSource WHERE source_name = '$source'), (SELECT source_id FROM CustomerSource WHERE source_name = 'unknown')),
                              '$note',
                              current_timestamp,
                              $base_price_trans,
                              $sell_price_trans,
                              $profit_trans,
                              'USD',";

if ($confirmPaymentTime == 'KSH') {
  $transactionsInsertSql .= " NULL)";
} else {
  $transactionsInsertSql .= " '$confirmPaymentTime')";
}
$conn->query($transactionsInsertSql);

$sql = "SELECT transaction_id FROM Transactions WHERE airticket_tour_id = '$airticket_tour_id'";
$result = $conn->query($sql);
$transaction_id = $result->fetch_assoc()['transaction_id'];


if (isset($_POST['tc_id'])) {
  $tc_id = $_POST['tc_id'];
  $sql = "UPDATE Transactions SET tc_id = $tc_id WHERE transaction_id = $transaction_id";
  $conn->query($sql);
} else {
  $sql = "UPDATE Transactions SET tc_id = $transaction_id WHERE transaction_id = $transaction_id";
  $conn->query($sql);
}

if ($payment_type == 'airmco') {
  $mco_party = $_POST['mco_party'];
  $mco_invoice = empty($_POST['mco_invoice']) ? '': $_POST['mco_invoice'];
  $face_value = $_POST['face_value'];
  $face_currency = $_POST['face_currency'];
  $mco_value = $_POST['mco_value'];
  $mco_currency = $_POST['mco_currency'];
  $mco_credit = $_POST['mco_credit'];
  $mco_credit_currency = $_POST['mco_credit_currency'];
  $fee_ratio = $_POST['fee_ratio'];

  $add_card = $_POST['add_card'];

  $card_number = $_POST['card_number'];
  $expire_month = $_POST['expire_month'];
  $expire_year = $_POST['expire_year'];
  $card_holder = $_POST['card_holder'];
  $mco_receiver = empty($_POST['mco_receiver']) ? 'KSH' : $_POST['mco_receiver'];

  if ($add_card == 'Y') {
    $sql = "INSERT INTO NoticeBoard (
              valid_until, edited_by, content, gotop, category
            ) SELECT
              CURRENT_DATE + INTERVAL 1 year, ua.user_id, NULL, 'N', 'mco'
            FROM UserAccount ua WHERE ua.account_id = '$salesperson'";
    $conn->query($sql);

    $sql = "SELECT max(nb.notice_id) AS notice_id
            FROM NoticeBoard nb
            JOIN UserAccount ua
            ON nb.edited_by = ua.user_id
            WHERE ua.account_id = '$salesperson'";
    $result = $conn->query($sql);
    $noticeId = $result->fetch_assoc()['notice_id'];

    if ($mco_receiver != 'KSH') {
      $sql = "INSERT INTO NoticeTarget (notice_id, target_id)
              SELECT $noticeId, ua.user_id
              FROM UserAccount ua
              WHERE ua.account_id LIKE '$mco_receiver'";
      $conn->query($sql);
    } else {
      $sql = "INSERT INTO NoticeTarget (notice_id, target_id)
              VALUES ($noticeId, NULL)";
      $conn->query($sql);
    }

    $expire_date = $expire_month . '/' . $expire_year;
    if ($mco_currency == 'RMB') {
      $mco_value_trans /= $exchange_rate;
    }

    $sql = "INSERT INTO McoInfo (
              cardholder, card_number, exp_date, charging_amount_currency, charging_amount, notice_id, used, create_time
            ) VALUES (
              '$card_holder', '$card_number', '$expire_date', 'USD', '$mco_value_trans', '$noticeId', 'N', current_timestamp
            )";
    $conn->query($sql);

    $sql = "SELECT mco_id FROM McoInfo WHERE notice_id = '$noticeId'";
    $result = $conn->query($sql);
    $mco_id = $result->fetch_assoc()['mco_id'];
  } else {
    $mco_id = 'NULL';
  }

  $sql = "INSERT INTO McoPayment
          (
            mco_party,
            face_value,
            mco_value,
            mco_credit,
            fee_ratio,
            face_currency,
            mco_currency,
            mco_credit_currency,
            mco_id
          ) VALUES (
            '$mco_party',
            '$face_value',
            '$mco_value',
            '$mco_credit',
            '$fee_ratio',
            '$face_currency',
            '$mco_currency',
            '$mco_credit_currency',
            $mco_id
          )";
    $conn->query($sql);

    $sql = "SELECT max(mp_id) AS mp_id FROM McoPayment
            WHERE mco_party = '$mco_party'
            AND face_value = '$face_value'
            AND mco_value = '$mco_value'";
    $result = $conn->query($sql);
    $mp_id = $result->fetch_assoc()['mp_id'];

    $sql = "UPDATE AirticketTour SET mp_id = '$mp_id' WHERE airticket_tour_id = '$airticket_tour_id'";
    $conn->query($sql);
}

if ($mco_currency == 'RMB') {
  $mco_value /= $exchange_rate;
}
if ($mco_credit_currency == 'RMB') {
  $mco_credit /= $exchange_rate;
}
if ($face_currency == 'RMB') {
  $face_value /= $exchange_rate;
}

$start_date = $leave_date[0];
$return_date = $leave_date[sizeof($leave_date)-1];
if ($payment_type == 'airall') {
  $sql = "INSERT INTO FinanceStatus (
              transaction_id,
              invoice,
              lock_status, clear_status, paid_status, finish_status,
              debt,
              received,
              selling_price,
              create_time,
              depart_date,
              arrival_date,
              following_id_collection,
              total_profit,
              debt_raw,
              debt_cleared,
              received_raw,
              received_finished,
              wholesaler_code)
          SELECT
            $transaction_id,
            '$invoice', 'N', 'N', 'N', 'N',
            $base_price_trans,
            'CC',
            $sell_price_trans,
            t.create_time,
            '$start_date',
            '$return_date',
            group_concat(t.transaction_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans,
            $base_price_trans,
            0,
            $sell_price_trans,
            0,
            '$wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transaction_id
          GROUP BY t.tc_id";
    $conn->query($sql);
} else if ($payment_type == 'airmco') {
  $mco_party = $_POST['mco_party'];
  if ($mco_party == 'GTT') {
    $paid_status_GTT = 'Y';
  } else {
    $paid_status_GTT = 'N';
  }
  $mco_invoice = empty($_POST['mco_invoice']) ? '': $_POST['mco_invoice'];
  $sql = "INSERT INTO FinanceStatus (
              transaction_id,
              invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, debt_raw,
              debt_cleared,
              received_raw,
              received_finished,
              wholesaler_code)
          SELECT
            $transaction_id,
            '$invoice', 'N', 'N', '$paid_status_GTT', 'N',
            $base_price_trans,
            $face_value,
            $sell_price_trans,
            t.create_time,
            '$start_date',
            '$return_date',
            group_concat(t.transaction_id SEPARATOR ','),
            $face_value - $base_price_trans,
            $base_price_trans, 0,
            $face_value, 0, '$wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transaction_id
          GROUP BY t.tc_id";
    $conn->query($sql);
    $sql = "INSERT INTO FinanceStatus (
              transaction_id,
              invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, ending, debt_raw,
              debt_cleared,
              received_raw,
              received_finished, wholesaler_code)
          SELECT
            $transaction_id,
            '$mco_invoice','N', 'N','N', 'N',
            -$mco_credit,
            'CC',
            0,
            t.create_time,
            '$start_date',
            '$return_date',
            group_concat(t.transaction_id SEPARATOR ','),
            $mco_credit,
            'mco', -$mco_credit, 0,
            0, 0, '$mco_party'
          FROM Transactions t
          WHERE t.transaction_id = $transaction_id
          GROUP BY t.tc_id";
      $conn->query($sql);
} else {
  $sql = "INSERT INTO FinanceStatus(transaction_id,
              invoice,
              lock_status, clear_status, paid_status, finish_status,
              debt,
              received,
              selling_price,
              create_time,
              depart_date,
              arrival_date,
              following_id_collection,
              total_profit,
              debt_raw,
              debt_cleared,
              received_raw,
              received_finished, wholesaler_code)
          SELECT
            $transaction_id,
            '$invoice', 'N', 'N', 'N', 'N',
            $base_price_trans,
            $sell_price_trans,
            $sell_price_trans,
            t.create_time,
            '$start_date',
            '$return_date',
            group_concat(t.transaction_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans,
            $base_price_trans, 0,
            $sell_price_trans, 0, '$wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transaction_id
          GROUP BY t.tc_id";
    $conn->query($sql);
}
mysqli_close($conn);
 ?>
