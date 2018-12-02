<?php include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];


//

$query = "SELECT
            a.itinerary,
            s.salesperson_code,
            a.locators,
            a.flight_code,
            a.ticket_type,
            a.round_trip,
            a.adult_number+a.youth_number+a.child_number+a.infant_number AS total_number,
            a.ticketed_date,
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
            (
              SELECT GROUP_CONCAT(concat(an.lname, '/', an.fname) SEPARATOR ',')
              FROM AirticketNumber an
              WHERE an.airticket_tour_id = a.airticket_tour_id
              GROUP BY an.airticket_tour_id
            ) AS customer_name,
            (
              SELECT GROUP_CONCAT(an.airticket_number SEPARATOR ',')
              FROM AirticketNumber an
              WHERE an.airticket_tour_id = a.airticket_tour_id
              GROUP BY an.airticket_tour_id
            ) AS airticket_number,
            (
              SELECT GROUP_CONCAT(an.customer_type SEPARATOR ',')
              FROM AirticketNumber an
              WHERE an.airticket_tour_id = a.airticket_tour_id
              GROUP BY an.airticket_tour_id
            ) AS customer_type,
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
            (
              SELECT invoice
              FROM FinanceStatus
              WHERE transaction_id = t.transaction_id
              AND ending = 'mco'
            ) AS mco_invoice,
            t.confirm_payment_time, 
            (SELECT group_concat(z.transaction_id SEPARATOR ',')
            FROM Transactions z
            WHERE z.tc_id = t.tc_id
            GROUP BY z.tc_id) AS collection_info, 
           t.tc_id
        FROM AirticketTour a
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
        WHERE t.transaction_id = $transactionId";
// echo $query;
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
            mp.mco_party,
            mp.face_value,
            mp.face_currency,
            mp.mco_value,
            mp.mco_currency,
            mp.mco_credit,
            mp.mco_credit_currency,
            mp.fee_ratio,
            mi.cardholder,
            mi.card_number,
            mi.exp_date,
            ua.account_id
        FROM McoPayment mp
        JOIN AirticketTour a ON a.mp_id = mp.mp_id
        LEFT JOIN McoInfo mi ON mp.mco_id = mi.mco_id
        LEFT JOIN NoticeBoard nb ON mi.notice_id = nb.notice_id
        LEFT JOIN NoticeTarget nt ON nt.notice_id = nb.notice_id
        LEFT JOIN UserAccount ua ON ua.user_id = nt.target_id
        LEFT JOIN Transactions t ON a.airticket_tour_id = t.airticket_tour_id
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
