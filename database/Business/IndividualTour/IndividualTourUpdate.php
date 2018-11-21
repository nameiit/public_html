<?php
include('../../dbConnection.php');
session_start();
$login_username = $_SESSION["username"];
$transactionId = $_POST['transactionId'];

$product_code = $_POST['product_code'];
$tour_name = $_POST['tour_name'];
$invoice = $_POST['invoice'];
$salesperson = $_POST['salesperson'];
$wholesaler = $_POST['wholesaler'];
$source = $_POST['source'];
$note = $_POST['note'];

$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$duration = $_POST['duration'];

$base_price = $_POST['base_price'];
$base_price_currency = $_POST['base_price_currency'];
$sell_price = $_POST['sell_price'];
$sell_price_currency = $_POST['sell_price_currency'];
$transaction_fee = $_POST['transaction_fee'];
$actual_received = $_POST['actual_received'];
$coupon = $_POST['coupon'];
$coupon_currency = $_POST['coupon_currency'];

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone = $_POST['phone'];
$otherContactWay = $_POST['other_contact_type'];
$otherContactInfo = $_POST['other_contact_number'];

$birthday = $_POST['birthday'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$zipcode = $_POST['zipcode'];

$joinDate = $_POST['join_date'];
$leaveDate = $_POST['leave_date'];
$joinLocation = $_POST['join_location'];
$leaveLocation = $_POST['leave_location'];

$query = "SELECT indiv_tour_id FROM Transactions WHERE transaction_id = '$transactionId'";
$result = $conn->query($query);
$indiv_tour_id = $result->fetch_assoc()['indiv_tour_id'];


$query = "SELECT * FROM Customer WHERE fname = '$fname' AND lname = '$lname'";
if ($birthday != "") {
    $query .= " AND birth_date = '$birthday'";
}
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
  if ($birthday != "") {
      $query .= " AND birth_date = '$birthday'";
  }
  $query .= " ORDER BY customer_id DESC LIMIT 1";
  $result = $conn->query($query);
  $customerId = $result->fetch_assoc()['customer_id'];

  $query = "UPDATE Customer
            SET
              phone = '$phone',
              other_contact_type = '$otherContactWay',
              other_contact_number = '$otherContactInfo',
              birthday = '$birthday',
              gender = '$gender',
              email = '$email',
              zipcode = '$zipcode'
            WHERE
              customer_id = '$customerId'";
}
$result = $conn->query($query);


$query = "SELECT customer_id FROM Customer WHERE fname = '$fname' AND lname = '$lname'";
if ($birthday != "") {
    $query .= " AND birth_date = '$birthday'";
}
$query .= " ORDER BY customer_id DESC LIMIT 1";
$result = $conn->query($query);
$customerId = $result->fetch_assoc()['customer_id'];


// Update IndividualTour table
$query = "UPDATE IndividualTour
          SET
            product_code = '$product_code',
            tour_name = '$tour_name',
            indiv_tour_invoice = '$invoice',
            salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
            wholesaler_id = (SELECT wholesaler_id FROM Wholesaler WHERE wholesaler_code = '$wholesaler'),
            depart_date = '$start_date',
            arrival_date = '$end_date',
            base_price = '$base_price',
            base_currency = '$base_price_currency',
            sale_price = '$sell_price',
            sale_currency = '$sell_price_currency',
            commission_fee = '$transaction_fee',
            received = '$actual_received',
            join_date = '$joinDate',
            leave_date = '$leaveDate',
            join_location = '$joinLocation',
            leave_location = '$leaveLocation',
            customer_id = '$customerId'
          WHERE
            indiv_tour_id = $indiv_tour_id";
$conn->query($query);

if (!is_numeric($coupon) and $coupon != "") {
  $couponId = "";

  $query = "SELECT cc_id, discount, currency FROM CouponCode WHERE code = '$coupon'";
  $result = $conn->query($query);
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          $couponId = $row['cc_id'];
          $coupon = $row['discount'];
          $coupon_currency = $row['currency'];
      }
  }

  $sql = "UPDATE
              IndividualTour
            SET
              cc_id = '$couponId',
              coupon = '$coupon',
              coupon_currency = '$coupon_currency'
            WHERE
              indiv_tour_id = $indiv_tour_id";
} else if (is_numeric($coupon)){
  $sql = "UPDATE IndividualTour SET cc_id = NULL, coupon = '$coupon', coupon_currency = '$coupon_currency'";
} else {
  $sql = "UPDATE IndividualTour SET cc_id = NULL, coupon = 0, coupon_currency = '$base_price_currency'";
}
$conn->query($sql);

$query = "UPDATE LogLastEditor 
          SET user_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username') 
          WHERE transaction_id = '$transactionId';";
$conn->query($query);

$query = "UPDATE Transactions
          SET
            source_id = (SELECT source_id FROM CustomerSource WHERE source_name = '$source'),
            salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'),
            note = '$note'
          WHERE transaction_id = $transactionId";
$conn->query($query);


mysqli_close($conn);
?>
