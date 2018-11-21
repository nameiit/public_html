<?php include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];

$query = "SELECT
    a.itinerary,
    s.salesperson_code,
    a.locators,
    a.flight_code,
    a.ticket_type,
    a.round_trip,
    a.adult_number+a.youth_number+a.child_number+a.infant_number AS total_number,
    w.wholesaler_code,
    a.invoice,
    cs.source_name,
    t.note,
    a.exchange_rate_usd_rmb,
    a.deal_location,
    a.selling_price,
    a.selling_currency,
    a.base_price,
    a.base_currency,
    a.payment_type,
    t.total_profit,
    concat(c.lname, '/', c.fname) as customer_name,
    a.adult_number,
    a.youth_number,
    a.child_number,
    a.infant_number,
    c.phone,
    c.email,
    c.birth_date,
    c.gender,
    c.other_contact_type,
    c.other_contact_number,
    c.zipcode,
    group_concat(tc.following_id SEPARATOR ',') AS following_id_collection
FROM
    AirticketTour a
    JOIN Transactions t
    ON a.airticket_tour_id = t.airticket_tour_id
    JOIN Salesperson s
    ON a.salesperson_id = s.salesperson_id
    JOIN Wholesaler w
    ON a.wholesaler_id = w.wholesaler_id
    JOIN CustomerSource cs
    ON cs.source_id = t.source_id
    JOIN Customer c
    ON a.customer_id = c.customer_id
    LEFT JOIN TransactionCollections tc
    ON tc.starter_id = t.transaction_id
    WHERE t.transaction_id = $transactionId
    GROUP BY tc.starter_id";
$result = $conn->query($query);

$res = array();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $res = $row;
}

$query = "SELECT airticket_tour_id FROM Transactions WHERE transaction_id = $transactionId";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $airticket_tour_id = $result->fetch_assoc()['airticket_tour_id'];
}
$query = "SELECT flight_number, depart_date, depart_airport, arrival_airport FROM AirSchedule WHERE airticket_tour_id = $airticket_tour_id";
$result = $conn->query($query);

$flight_numbers = array();
$depart_dates = array();
$depart_airports = array();
$arrival_airports = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($flight_numbers, $row['flight_number']);
        array_push($depart_dates, $row['depart_date']);
        array_push($depart_airports, $row['depart_airport']);
        array_push($arrival_airports, $row['arrival_airport']);
    }
}

$res['flight_number'] = $flight_numbers;
$res['depart_date'] = $depart_dates;
$res['depart_airport'] = $depart_airports;
$res['arrival_airport'] = $arrival_airports;


$sql = "SELECT
    mco_party,
    face_value,
    face_currency,
    mco_value,
    mco_currency,
    mco_credit,
    mco_credit_currency,
    fee_ratio
FROM
    McoPayment mp
    JOIN AirticketTour a
    ON a.mp_id = mp.mp_id
    JOIN Transactions t
    ON a.airticket_tour_id = t.airticket_tour_id
WHERE t.transaction_id = '$transactionId'";
$result = $conn->query($sql);

$mco_info = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($mco_info, $row);
    }
}
$res['mco_info'] = $mco_info;

echo json_encode($res);

mysqli_close($conn);
?>
