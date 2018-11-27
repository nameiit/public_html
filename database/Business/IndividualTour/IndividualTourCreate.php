<?php include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$indiv_tour_id = $_POST['indiv_tour_id'];
$indiv_salesperson = $_POST['indiv_salesperson'];
$indiv_tour_name = $_POST['indiv_tour_name'];
$indiv_wholesaler = empty($_POST['indiv_wholesaler'])? 'unknown' : $_POST['indiv_wholesaler'];
$invoice = $_POST['invoice'];
$indiv_source = empty($_POST['indiv_source'])? 'unknown' : $_POST['indiv_source'];
$indiv_note = $_POST['indiv_note'];

$us_class = $_POST['us_class'];
$first_class = $_POST['first_class'];
$second_class = $_POST['second_class'];
$third_class = $_POST['third_class'];
$indiv_startTime = $_POST['indiv_startTime'];
$indiv_endTime = $_POST['indiv_endTime'];
$indiv_num_days = $_POST['indiv_num_days'];

$indiv_exchange_rate = $_POST['indiv_exchange_rate'];
$payment_area = $_POST['payment_area'];
$indiv_sell_price = $_POST['indiv_sell_price'];
$indiv_sell_price_currency = $_POST['indiv_sell_price_currency'];
$indiv_base_price = $_POST['indiv_base_price'];
$indiv_base_price_currency = $_POST['indiv_base_price_currency'];
$payment_type = $_POST['payment_type'];
$profit = $_POST['profit'];
$profit_currency = $_POST['profit_currency'];

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone = $_POST['phone'];
$otherContactWay = $_POST['otherContactWay'];
$otherContactInfo = $_POST['otherContactInfo'];
$birthday = $_POST['birthday'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$zipcode = $_POST['zipcode'];

/******
在这里
*****/
$cc_amount = $_POST['cc_amount'];
$noncc_amount = $_POST['noncc_amount'];
/******
在这里
*****/


$query = "SELECT * FROM Customer WHERE fname = '$fname' AND lname = '$lname'";
$result = $conn->query($query);

if ($result->num_rows == 0) {
    $query = "INSERT INTO Customer";
    $columnName = "(fname, lname";
    if ($email != "") $columnName .= ", email";
    if ($phone != "") $columnName .= ", phone";
    if ($otherContactWay != "") $columnName .= ", other_contact_type";
    if ($otherContactInfo != "") $columnName .= ", other_contact_number";
    if ($birthday != "") $columnName .= ", birth_date";
    if ($gender != "") $columnName .= ", gender";
    if ($zipcode != "") $columnName .= ", zipcode";

    $columnName .= ")";
    $query .= $columnName;
    $query .= " VALUES ('$fname', '$lname'";
    if ($email != "") $query .= ", '$email'";
    if ($phone != "") $query .= ", '$phone'";
    if ($otherContactWay != "") $query .= ", '$otherContactWay'";
    if ($otherContactInfo != "") $query .= ", '$otherContactInfo'";
    if ($birthday != "") $query .= ", '$birthday'";
    if ($gender != "") $query .= ", '$gender'";
    if ($zipcode != "") $query .= ", '$zipcode'";
    $query .= ")";
} else {
  $query = "SELECT customer_id FROM Customer WHERE fname = '$fname' AND lname = '$lname'";
  $result = $conn->query($query);
  $customerId = $result->fetch_assoc()['customer_id'];

  $query = "UPDATE Customer
            SET
              phone = '$phone',
              other_contact_type = '$otherContactWay',
              other_contact_number = '$otherContactInfo',
              birth_date = '$birthday',
              gender = '$gender',
              email = '$email',
              zipcode = '$zipcode'
            WHERE
              customer_id = '$customerId'";
}
$result = $conn->query($query);

$query = "SELECT customer_id FROM Customer WHERE fname = '$fname' AND lname = '$lname'";
$result = $conn->query($query);
$customerId = $result->fetch_assoc()['customer_id'];

// 得到零售商id
$query = "SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$indiv_wholesaler'";
$result = $conn->query($query);
$wholesaler_id = $result->fetch_assoc()['wholesaler_id'];

// 得到销售id
$query = "SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$indiv_salesperson'";
$result = $conn->query($query);
$salesperson_id = $result->fetch_assoc()['salesperson_id'];

$sql = "INSERT INTO DestinationList (
          us_class, first_class, second_class, third_class
        ) VALUES (
          '$us_class', '$first_class', '$second_class', '$third_class'
        )";
$conn->query($sql);

$sql = "SELECT max(dl_id) as id
        FROM DestinationList
        WHERE us_class = '$us_class'
        AND first_class = '$first_class'
        AND second_class = '$second_class'
        AND third_class = '$third_class'";
$result = $conn->query($sql);
$dl_id = $result->fetch_assoc()['id'];


$query = "INSERT INTO IndividualTour (
            product_code,
            tour_name,
            indiv_tour_invoice,
            wholesaler_id,
            salesperson_id,
            depart_date,
            arrival_date,
            exchange_rate,
            base_price,
            base_currency,
            selling_price,
            selling_currency,
            customer_id,
            payment_type,
            deal_location,
            dl_id
          ) VALUES (
            '$indiv_tour_id',
            '$indiv_tour_name',
            '$invoice',
            '$wholesaler_id',
            '$salesperson_id',
            '$indiv_startTime',
            '$indiv_endTime',
            '$indiv_exchange_rate',
            '$indiv_base_price',
            '$indiv_base_price_currency',
            '$indiv_sell_price',
            '$indiv_sell_price_currency',
            '$customerId',
            '$payment_type',
            '$payment_area',
            '$dl_id'
        )";
$result = $conn->query($query);

// 得到IndividualTour Id
$query = "SELECT indiv_tour_id from IndividualTour WHERE salesperson_id = '$salesperson_id' ORDER BY indiv_tour_id DESC LIMIT 1";
$result = $conn->query($query);
$individualTourId = $result->fetch_assoc()['indiv_tour_id'];



$base_price_trans = $indiv_base_price;
$sell_price_trans = $indiv_sell_price;
$profit_trans = $profit;
if ($indiv_base_price_currency == 'RMB') {
  $base_price_trans = $indiv_base_price / $indiv_exchange_rate;
}
if ($indiv_sell_price_currency == 'RMB') {
  $sell_price_trans = $indiv_sell_price / $indiv_exchange_rate;
}
if ($prof_currency == 'RMB') {
  $profit_trans = $profit / $indiv_exchange_rate;
}
$transactionsInsertSql = "INSERT INTO Transactions(
                            type,
                            indiv_tour_id,
                            note,
                            create_time,
                            settle_time,
                            source_id,
                            received,
                            expense,
                            total_profit,
                            currency
                          ) VALUES (
                            'individual',
                            '$individualTourId',
                            '$indiv_note',
                            current_timestamp,
                            (SELECT arrival_date FROM IndividualTour WHERE indiv_tour_id = $individualTourId),
                            (SELECT source_id FROM CustomerSource WHERE source_name = '$indiv_source'),
                            '$sell_price_trans',
                            '$base_price_trans',
                            $profit_trans,
                            'USD'
                        )";
$conn->query($transactionsInsertSql);

$sql = "SELECT max(transaction_id) AS transaction_id
        FROM Transactions t
        JOIN IndividualTour i
        ON i.indiv_tour_id = t.indiv_tour_id
        WHERE i.salesperson_id = '$salesperson_id';";
$result = $conn->query($sql);
$transactionId = $result->fetch_assoc()['transaction_id'];
$sql = "INSERT INTO LogLastEditor(transaction_id, user_id) VALUES($transactionId, (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'));";
$conn -> query($sql);

if (isset($_POST['collection_list'])) {
  $collection_list = json_decode($_POST['collection_list']);

  for ($i = 0; $i < sizeof($collection_list); $i++) {
    $sql = "INSERT INTO TransactionCollections (starter_id, following_id) VALUES ('$transactionId', $collection_list[$i])";
    $conn->query($sql);
  }
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

if ($payment_type == 'wholesalerall' || $payment_type == 'wholesalercheck' || $payment_type == 'wholesalercash' || $payment_type == 'wholesaleralipay' || $payment_type == 'wholesalerwechat' || $payment_type == 'wholesalerremit') {

  $sql = "INSERT INTO FinanceStatus(transaction_id,
              invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, debt_raw, received_raw, debt_cleared, received_finished)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            $base_price_trans, 'CC', $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans, $base_price_trans, $sell_price_trans, 0, 0
          FROM Transactions t
          LEFT JOIN TransactionCollections tc
          ON tc.starter_id = t.transaction_id
          WHERE t.transaction_id = $transactionId
          GROUP BY tc.starter_id";
          $conn->query($sql);
} else if ($payment_type == 'wholesalermco') {
    $mco_party = $_POST['mco_party'];
    $face_value = $_POST['face_value'];
    $face_currency = $_POST['face_currency'];
    $mco_value = $_POST['mco_value'];
    $mco_currency = $_POST['mco_currency'];
    $mco_credit = $_POST['mco_credit'];
    $mco_credit_currency = $_POST['mco_credit_currency'];
    $fee_ratio = $_POST['fee_ratio'];

    $card_number = $_POST['card_number'];
    $expired_date_month = $_POST['expired_date_month'];
    $expired_date_year = $_POST['expired_date_year'];
    $card_holder = $_POST['card_holder'];
    $mco_receiver = $_POST['mco_receiver'];

    $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
                  lock_status,clear_status,paid_status,finish_status,
                  debt, received, selling_price, create_time,
                  depart_date, arrival_date, following_id_collection,
                  total_profit, debt_raw, debt_cleared, received_raw, received_finished)
            SELECT
              $transactionId,
              '$invoice',
              'N', 'N', 'N', 'N',
              $base_price_trans, 'CC', $sell_price_trans, t.create_time,
              '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
              $face_value - $base_price_trans, $base_price_trans, 0, $face_value, 0
            FROM Transactions t
            LEFT JOIN TransactionCollections tc
            ON tc.starter_id = t.transaction_id
            WHERE t.transaction_id = $transactionId
            GROUP BY tc.starter_id
            ";
  $conn->query($sql);
  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
                lock_status,clear_status,paid_status,finish_status,
                debt, received, selling_price, create_time,
                depart_date, arrival_date, following_id_collection,
                total_profit,debt_raw, debt_cleared, received_raw, received_finished, ending)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            concat($mco_value, '/', $mco_credit), 'CC', 0, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
            $mco_credit, $mco_value - $mco_credit, 0, $mco_value, 0, 'mco'
          FROM Transactions t
          LEFT JOIN TransactionCollections tc
          ON tc.starter_id = t.transaction_id
          WHERE t.transaction_id = $transactionId
          GROUP BY tc.starter_id
          ";
  $conn->query($sql);

  $expire_date = $expired_date_month . '/' . $expired_date_year;

  $sql = "INSERT INTO NoticeBoard (valid_until, edited_by, category) VALUES (CURRENT_DATE + INTERVAL 1 year, $salesperson_id, 'mco')";
  $conn->query($sql);
  $sql = "SELECT max(notice_id) AS notice_id FROM NoticeBoard WHERE edited_by = $salesperson_id AND category = 'mco'";
  $result = $conn->query($sql);
  $notice_id = $result->fetch_assoc()['notice_id'];
  $sql = "INSERT INTO NoticeTarget (notice_id, target_id)
          SELECT '$notice_id', ua.user_id
          FROM UserAccount ua
          WHERE ua.account_id LIKE '$mco_receiver'";

  // echo $sql;
  $conn->query($sql);
  $sql = "INSERT INTO McoInfo
          (
            cardholder,
            card_number,
            exp_date,
            notice_id,
            create_time,
            charging_amount,
            charging_amount_currency
          ) VALUES
          (
            '$card_holder',
            '$card_number',
            '$expire_date',
            '$notice_id',
            current_timestamp,
            '$mco_value',
            'USD'
          )";
  $conn->query($sql);
  $sql = "SELECT mco_id FROM McoInfo WHERE notice_id = '$notice_id'";
  $result = $conn->query($sql);
  $mco_id = $result->fetch_assoc()['mco_id'];

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
            '$mco_id'
          )";
    $conn->query($sql);

    $sql = "SELECT max(mp_id) as mp_id FROM McoPayment WHERE face_value = '$face_value'";
    $result = $conn->query($sql);
    $mp_id = $result->fetch_assoc()['mp_id'];

    $sql = "UPDATE IndividualTour SET mp_id = '$mp_id' WHERE indiv_tour_id = '$individualTourId'";
    $conn->query($sql);

} else if ($payment_type == 'mcoall') {
  $mco_party = $_POST['mco_party'];
  $face_value = $_POST['face_value'];
  $face_currency = $_POST['face_currency'];
  $mco_value = $_POST['mco_value'];
  $mco_currency = $_POST['mco_currency'];
  $mco_credit = $_POST['mco_credit'];
  $mco_credit_currency = $_POST['mco_credit_currency'];
  $fee_ratio = $_POST['fee_ratio'];

  $card_number = $_POST['card_number'];
  $expired_date_month = $_POST['expired_date_month'];
  $expired_date_year = $_POST['expired_date_year'];
  $card_holder = $_POST['card_holder'];

  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
                lock_status,clear_status,paid_status,finish_status,
                debt, received, selling_price, create_time,
                depart_date, arrival_date, following_id_collection,
                total_profit, debt_raw, debt_cleared, received_raw, received_finished)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            $base_price_trans, 'CC', $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
            - $base_price_trans, $base_price_trans, 0, 0, 0
          FROM Transactions t
          LEFT JOIN TransactionCollections tc
          ON tc.starter_id = t.transaction_id
          WHERE t.transaction_id = $transactionId
          GROUP BY tc.starter_id
          ";
  $conn->query($sql);
  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
                lock_status,clear_status,paid_status,finish_status,
                debt, received, selling_price, create_time,
                depart_date, arrival_date, following_id_collection,
                total_profit, debt_raw, debt_cleared, received_raw, received_finished, ending)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            concat($mco_value, '/', $mco_credit), 'CC', 0, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
            $mco_credit, $mco_value - $mco_credit, 0, $mco_value, 0, 'mco'
          FROM Transactions t
          LEFT JOIN TransactionCollections tc
          ON tc.starter_id = t.transaction_id
          WHERE t.transaction_id = $transactionId
          GROUP BY tc.starter_id
          ";
  $conn->query($sql);
  $sql = "INSERT INTO McoPayment
          (
            mco_party,
            face_value,
            mco_value,
            mco_credit,
            fee_ratio,
            face_currency,
            mco_currency,
            mco_credit_currency
          ) VALUES (
            '$mco_party',
            '$face_value',
            '$mco_value',
            '$mco_credit',
            '$fee_ratio',
            '$face_currency',
            '$mco_currency',
            '$mco_credit_currency'
          )";
    $conn->query($sql);

    $sql = "SELECT max(mp_id) as mp_id FROM McoPayment WHERE face_value = '$face_value'";
    $result = $conn->query($sql);
    $mp_id = $result->fetch_assoc()['mp_id'];

    $sql = "UPDATE IndividualTour SET mp_id = '$mp_id' WHERE indiv_tour_id = '$individualTourId'";
    $conn->query($sql);
    $sql = "INSERT INTO NoticeBoard (valid_until, edited_by, category) VALUES (CURRENT_DATE + INTERVAL 1 year, $salesperson_id, 'mco')";
    $conn->query($sql);
    $sql = "SELECT max(notice_id) FROM NoticeBoard WHERE edited_by = $salesperson_id AND category = 'mco'";
    $result = $conn->query($sql);
    $notice_id = $result->fetch_assoc()['notice_id'];
    $sql = "INSERT INTO NoticeTarget (notice_id, target_id)
            SELECT $notice_id, ua.user_id
            FROM UserAccount
            WHERE ua.account_id LIKE '$mco_receiver'";
    $conn->query($sql);
    $exp_date = $expired_date_month . '/' . $expired_date_year;
    $sql = "INSERT INTO McoInfo (cardholder, card_number, exp_date, notice_id, used_id, create_time) VALUES ('$card_holder', '$card_number', '$exp_date', $notice_id, current_timestamp)";
    $conn->query($sql);
} else {
  $sql = "INSERT INTO FinanceStatus(transaction_id,
              invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, debt_raw, debt_cleared, received_raw, received_finished)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            $base_price_trans, $sell_price_trans, $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(tc.following_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans, $base_price_trans, 0, $sell_price_trans, 0
          FROM Transactions t
          LEFT JOIN TransactionCollections tc
          ON tc.starter_id = t.transaction_id
          WHERE t.transaction_id = $transactionId
          GROUP BY tc.starter_id";
    $conn->query($sql);
}
// echo $sql;


mysqli_close($conn);

?>
