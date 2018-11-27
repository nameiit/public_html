<?php include('../../dbConnection.php');

$transactionId = $_POST['transaction_id'];
$query = "SELECT airticket_tour_id FROM Transactions WHERE transaction_id = $transactionId";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $airticket_tour_id = $result->fetch_assoc()['airticket_tour_id'];
}

$query = "DELETE FROM NoticeTarget WHERE notice_id = (
            SELECT mco.notice_id
            FROM McoInfo mco
            JOIN McoPayment mp
            ON mco.mco_id = mp.mco_id
            JOIN AirticketTour a
            ON mp.mp_id = a.mp_id
            WHERE a.airticket_tour_id = $airticket_tour_id
          )";
$conn->query($query);
$query = "DELETE FROM NoticeBoard
          WHERE notice_id = (
              SELECT mco.notice_id
              FROM McoInfo mco
              JOIN McoPayment mp
              ON mco.mco_id = mp.mco_id
              JOIN AirticketTour a
              ON mp.mp_id = a.mp_id
              WHERE a.airticket_tour_id = $airticket_tour_id
          )";
$conn->query($query);
$query = "DELETE FROM McoInfo WHERE mco_id =
          (SELECT mp.mco_id
          FROM McoPayment mp
          JOIN AirticketTour a
          ON a.mp_id = mp.mp_id
          WHERE a.airticket_tour_id = $airticket_tour_id)";
$conn->query($query);
$query = "DELETE FROM McoPayment WHERE mp_id = (
            SELECT mp_id FROM AirticketTour
            WHERE airticket_tour_id = $airticket_tour_id)";
$conn->query($query);
$query = "DELETE FROM AirSchedule WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);
$query = "DELETE FROM AirScheduleIntegrated WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);
$query = "DELETE FROM AirticketNumber WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);
$query = "DELETE FROM AirticketTour WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);

$query = "DELETE FROM FinanceStatus WHERE transaction_id = $transactionId";
$conn->query($query);
$query = "DELETE FROM TransactionCollections WHERE starter_id = $transactionId";
$conn->query($query);

$query = "DELETE FROM Transactions WHERE transaction_id = $transactionId";
$conn->query($query);


mysqli_close($conn);
?>
