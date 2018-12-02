<?php include('../../dbConnection.php');

$transactionId_old = $_POST['transactionId'];

$query = "SELECT indiv_tour_id FROM Transactions WHERE transaction_id = '$transactionId_old'";
$result = $conn->query($query);
$indiv_tour_id_old = $result->fetch_assoc()['indiv_tour_id'];

// get fs data for updatelog

$query = "SELECT count(*) AS num_row FROM FinanceStatus WHERE transaction_id = $transactionId_old";
$result = $conn->query($query);
$num_row = $result->fetch_assoc()['num_row'];

if ($num_row > 1) {
  $query = "SELECT debt_raw, received_raw, selling_price, ending FROM FinanceStatus
            WHERE transaction_id = $transactionId_old AND ending = 'mco'";
  $result = $conn->query($query);
  $debt_raw_mco_old = $result->fetch_assoc()['debt_raw'];
  $query = "SELECT debt_raw, received_raw, selling_price, ending FROM FinanceStatus
            WHERE transaction_id = $transactionId_old AND ending = NULL";
  $result = $conn->query($query);
  $temp = $result->fetch_assoc();
  $debt_raw_old = $temp['debt_raw'];
  $received_raw_old = $temp['received_raw'];
  $selling_price_raw_old = $temp['selling_price'];
} else if ($num_row == 1) {
  $query = "SELECT debt_raw, received_raw, selling_price, ending FROM FinanceStatus
            WHERE transaction_id = $transactionId_old AND ending = NULL";
  $result = $conn->query($query);
  $temp = $result->fetch_assoc();
  $debt_raw_old = $temp['debt_raw'];
  $received_raw_old = $temp['received_raw'];
  $selling_price_raw_old = $temp['selling_price'];
}


// delete 

$query = "DELETE FROM FinanceStatus WHERE transaction_id = $transactionId_old";
$conn->query($query);
$query = "DELETE FROM Transactions WHERE transaction_id = $transactionId_old";
$conn->query($query);
$query = "SELECT IFNULL(mp_id, 'KK') AS mp_id FROM IndividualTour WHERE indiv_tour_id = $indiv_tour_id_old";
$result = $conn->query($query);
$mp_id = $result->fetch_assoc()['mp_id'];
$query = "DELETE FROM IndividualTour WHERE indiv_tour_id = $indiv_tour_id_old";
$conn->query($query);
if ($mp_id != 'KK') {
    $query = "SELECT IFNULL(mco_id, 'TT') AS mco_id FROM McoPayment WHERE mp_id = $mp_id";
    $result = $conn->query($query);
    $mco_id = $result->fetch_assoc()['mco_id'];
    $query = "DELETE FROM McoPayment WHERE mp_id = $mp_id";
    $conn->query($query);
    if ($mco_id != 'TT') {
        $query = "SELECT notice_id FROM McoInfo WHERE mco_id = $mco_id";
        $result = $conn->query($query);
        $notice_id = $result->fetch_assoc()['notice_id'];
        $query = "DELETE FROM McoInfo WHERE mco_id = $mco_id";
        $conn->query($query);
        $query = "DELETE FROM NoticeTarget WHERE notice_id = $notice_id";
        $conn->query($query);
        $query = "DELETE FROM NoticeBoard WHERE notice_id = $notice_id";
        $conn->query($query);
    }
}

// create 
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

$confirmPaymentTime = empty($_POST['confirm_payment_time']) ? 'KSH' : $_POST['confirm_payment_time'];
$add_card = $_POST['add_card'];


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
$query = "SELECT max(indiv_tour_id) AS indiv_tour_id
          FROM IndividualTour 
          WHERE salesperson_id = '$salesperson_id'";
$result = $conn->query($query);
$individualTourId = $result->fetch_assoc()['indiv_tour_id'];

// 更换ID
$query = "UPDATE IndividualTour SET indiv_tour_id = $indiv_tour_id_old WHERE indiv_tour_id = $individualTourId";
$conn->query($query);
$individualTourId = $indiv_tour_id_old;

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
                            currency,
                            confirm_payment_time,
                            tc_id
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
                            'USD',";

if ($confirmPaymentTime == 'KSH') {
  $transactionsInsertSql .= " NULL, transaction_id)";
} else {
  $transactionsInsertSql .= " '$confirmPaymentTime',transaction_id)";
}
$conn->query($transactionsInsertSql);

$sql = "SELECT transaction_id FROM Transactions WHERE indiv_tour_id = $individualTourId";
$result = $conn->query($sql);
$transactionId = $result->fetch_assoc()['transaction_id'];

// 更换ID


$sql = "UPDATE Transactions 
        SET tc_id = $transactionId_old, 
        transaction_id = $transactionId_old 
        WHERE transaction_id = $transactionId";
$conn->query($sql);

$transactionId = $transactionId_old;

if (isset($_POST['tc_id'])) {
  $tc_id = $_POST['tc_id'];
  $sql = "UPDATE Transactions SET tc_id = $tc_id WHERE transaction_id = '$transactionId'";
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


if ($payment_type == 'wholesalermco' || $payment_type == 'mcoall') {
  $mco_party = $_POST['mco_party'];
  $mco_invoice = empty($_POST['mco_invoice']) ? '': $_POST['mco_invoice'];
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
  $mco_receiver = empty($_POST['mco_receiver']) ? 'KSH' : $_POST['mco_receiver'];

  $expire_date = $expired_date_month . '/' . $expired_date_year;

  if ($add_card == 'Y'){
    $sql = "INSERT INTO NoticeBoard (valid_until, edited_by, category)
            SELECT
            CURRENT_DATE + INTERVAL 1 year,
            ua.user_id, 'mco'
            FROM UserAccount ua WHERE ua.account_id = '$indiv_salesperson'";
    $conn->query($sql);
    $sql = "SELECT max(nb.notice_id) AS notice_id
            FROM NoticeBoard nb
            JOIN UserAccount ua
            ON nb.edited_by = ua.user_id
            WHERE ua.account_id = '$indiv_salesperson'";
    $result = $conn->query($sql);
    $notice_id = $result->fetch_assoc()['notice_id'];
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
  }
  // else {
    // $mco_id = 'KSH';
  // }

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

    $sql = "UPDATE IndividualTour SET mp_id = '$mp_id' WHERE indiv_tour_id = '$individualTourId'";
    $conn->query($sql);
}

if ($payment_type == 'wholesalerall' ||
    $payment_type == 'wholesalercheck' ||
    $payment_type == 'wholesalercash' ||
    $payment_type == 'wholesaleralipay' ||
    $payment_type == 'wholesalerwechat' ||
    $payment_type == 'wholesalerremit') {


  // $cc_amount = $_POST['cc_amount'];
  // $noncc_amount = $_POST['noncc_amount'];

  // if ($indiv_sell_price_currency == 'RMB') {
  //   $cc_amount_trans = $cc_amount / $indiv_exchange_rate;
  // }
  // if ($indiv_sell_price_currency == 'RMB') {
  //   $noncc_amount_trans = $noncc_amount / $indiv_exchange_rate;
  // }

  $sql = "INSERT INTO FinanceStatus(transaction_id,
            invoice,
            lock_status,clear_status,paid_status,finish_status,
            debt, received, selling_price, create_time,
            depart_date, arrival_date, following_id_collection,
            total_profit, debt_raw, received_raw, debt_cleared, received_finished, wholesaler_code)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            $base_price_trans, 'CC', $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans, $base_price_trans, $sell_price_trans, 0, 0, '$indiv_wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transactionId
          GROUP BY t.tc_id";
  $conn->query($sql);
} else if ($payment_type == 'wholesalermco') {
    $mco_party = $_POST['mco_party'];
    $mco_invoice = empty($_POST['mco_invoice']) ? '': $_POST['mco_invoice'];
    $face_value = $_POST['face_value'];
    $mco_value = $_POST['mco_value'];
    $mco_credit = $_POST['mco_credit'];
    if ($mco_party == 'GTT') {
      $paid_status_GTT = 'Y';
    } else {
      $paid_status_GTT = 'N';
    }

    $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, debt_raw, debt_cleared, received_raw, received_finished, wholesaler_code)
            SELECT
              $transactionId,
              '$invoice',
              'N', 'N', '$paid_status_GTT', 'N',
              $base_price_trans, $face_value, $sell_price_trans, t.create_time,
              '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
              $face_value - $base_price_trans, $base_price_trans, 0, $face_value, 0, '$indiv_wholesaler'
            FROM Transactions t
            WHERE t.transaction_id = $transactionId
            GROUP BY t.tc_id
            ";
  $conn->query($sql);
  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
                lock_status,clear_status,paid_status,finish_status,
                debt, received, selling_price, create_time,
                depart_date, arrival_date, following_id_collection,
                total_profit,debt_raw, debt_cleared, received_raw, received_finished, ending, wholesaler_code)
          SELECT
            $transactionId,
            '$mco_invoice',
            'N', 'N', 'N', 'N',
            -$mco_credit, 'CC', 0, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
            $mco_credit, - $mco_credit, 0, 0, 0, 'mco', '$mco_party'
          FROM Transactions t
          WHERE t.transaction_id = $transactionId
          GROUP BY t.tc_id
          ";
  $conn->query($sql);

} else if ($payment_type == 'mcoall') {
  $mco_party = $_POST['mco_party'];
  $mco_invoice = empty($_POST['mco_invoice']) ? '': $_POST['mco_invoice'];
  $face_value = $_POST['face_value'];
  $mco_value = $_POST['mco_value'];
  $mco_credit = $_POST['mco_credit'];
  if ($mco_party == 'GTT') {
    $paid_status_GTT = 'Y';
  } else {
    $paid_status_GTT = 'N';
  }
  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
            lock_status,clear_status,paid_status,finish_status,
            debt, received, selling_price, create_time,
            depart_date, arrival_date, following_id_collection,
            total_profit, debt_raw, debt_cleared, received_raw, received_finished, wholesaler_code)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'Y', 'Y',
            $base_price_trans, 0, $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
            - $base_price_trans, $base_price_trans, 0, 0, 0, '$indiv_wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transactionId
          GROUP BY t.tc_id
          ";
  $conn->query($sql);
  $sql = "INSERT INTO FinanceStatus(transaction_id, invoice,
            lock_status,clear_status,paid_status,finish_status,
            debt, received, selling_price, create_time,
            depart_date, arrival_date, following_id_collection,
            total_profit, debt_raw, debt_cleared, received_raw, received_finished, ending, wholesaler_code)
          SELECT
            $transactionId,
            '$mco_invoice',
            'N', 'N', 'N', 'N',
            -$mco_credit, 'CC', 0, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
            $mco_credit, - $mco_credit, 0, 0, 0, 'mco', '$mco_party'
          FROM Transactions t
          WHERE t.transaction_id = $transactionId
          GROUP BY t.tc_id
          ";
  $conn->query($sql);
} else {
  $sql = "INSERT INTO FinanceStatus(transaction_id,
              invoice,
              lock_status,clear_status,paid_status,finish_status,
              debt, received, selling_price, create_time,
              depart_date, arrival_date, following_id_collection,
              total_profit, debt_raw, debt_cleared, received_raw, received_finished, wholesaler_code)
          SELECT
            $transactionId,
            '$invoice',
            'N', 'N', 'N', 'N',
            $base_price_trans, $sell_price_trans, $sell_price_trans, t.create_time,
            '$indiv_startTime', '$indiv_endTime', group_concat(t.transaction_id SEPARATOR ','),
            $sell_price_trans - $base_price_trans, $base_price_trans, 0, $sell_price_trans, 0, '$indiv_wholesaler'
          FROM Transactions t
          WHERE t.transaction_id = $transactionId
          GROUP BY t.tc_id";
    $conn->query($sql);
}



// log

$query = "SELECT count(*) AS num_row FROM FinanceStatus WHERE transaction_id = $transactionId_old";
$result = $conn->query($query);
$num_row = $result->fetch_assoc()['num_row'];


if ($num_row > 1) {
  $query = "SELECT fs_id, debt_raw, received_raw, selling_price, ending FROM FinanceStatus
            WHERE transaction_id = $transactionId_old AND ending = 'mco'";
  $result = $conn->query($query);
  $debt_raw_mco_new = $result->fetch_assoc()['debt_raw'];
  if ($debt_raw_mco_old != $debt_raw_mco_new) {
    $sql = "INSERT INTO UpdateLog (
            name,
            value_before,
            value_after,
            value_difference,
            currency_before,
            currency_after,
            revised_by,
            revised_time,
            transaction_id
            ) SELECT
            'MCO',
            $debt_raw_mco_old,
            $debt_raw_mco_new,
            $debt_raw_mco_new - $debt_raw_mco_old,
            'USD',
            'USD',
            ua.user_id,
            current_timestamp,
            $transactionId_old
            FROM UserAccount ua WHERE ua.account_id = '$salesperson'";
    $conn->query($sql);
  }
}
$query = "SELECT fs_id, debt_raw, received_raw, selling_price, ending FROM FinanceStatus
          WHERE transaction_id = $transactionId_old AND ending = NULL";
$result = $conn->query($query);
$temp = $result->fetch_assoc();
$debt_raw_new = $temp['debt_raw'];
$received_raw_new = $temp['received_raw'];
$selling_price_raw_new = $temp['selling_price'];
if ($debt_raw_old != $debt_raw_new) {
  $sql = "INSERT INTO UpdateLog (
          name,
          value_before,
          value_after,
          value_difference,
          currency_before,
          currency_after,
          revised_by,
          revised_time,
          transaction_id
          ) SELECT
          'Debt',
          $debt_raw_old,
          $debt_raw_new,
          $debt_raw_new - $debt_raw_old,
          'USD',
          'USD',
          ua.user_id,
          current_timestamp,
          $transactionId_old
          FROM UserAccount ua WHERE ua.account_id = '$salesperson'";
  $conn->query($sql);
}
if ($received_raw_old != $received_raw_new) {
  $sql = "INSERT INTO UpdateLog (
          name,
          value_before,
          value_after,
          value_difference,
          currency_before,
          currency_after,
          revised_by,
          revised_time,
          transaction_id
          ) SELECT
          '应收款',
          $received_raw_old,
          $received_raw_new,
          $received_raw_new - $received_raw_old,
          'USD',
          'USD',
          ua.user_id,
          current_timestamp,
          $transactionId_old
          FROM UserAccount ua WHERE ua.account_id = '$salesperson'";
  $conn->query($sql);
}
if ($selling_raw_old != $selling_raw_new) {
  $sql = "INSERT INTO UpdateLog (
          name,
          value_before,
          value_after,
          value_difference,
          currency_before,
          currency_after,
          revised_by,
          revised_time,
          transaction_id
          ) SELECT
          '卖价',
          $selling_raw_old,
          $selling_raw_new,
          $selling_raw_new - $selling_raw_old,
          'USD',
          'USD',
          ua.user_id,
          current_timestamp,
          $transactionId_old
          FROM UserAccount ua WHERE ua.account_id = '$salesperson'";
  $conn->query($sql);
}
mysqli_close($conn);
?>
