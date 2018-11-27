<?php include('../../dbConnection.php');

$transactionId = $_POST['transaction_id'];
$query = "SELECT airticket_tour_id FROM Transactions WHERE transaction_id = $transactionId";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $airticket_tour_id = $result->fetch_assoc()['airticket_tour_id'];
}

$query = "DELETE FROM Transactions WHERE transaction_id = $transactionId";
$conn->query($query);

$query = "DELETE FROM AirSchedule WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);
$query = "DELETE FROM AirScheduleIntegrated WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);
$query = "DELETE FROM AirticketNumber WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);

$query = "DELETE FROM AirticketTour WHERE airticket_tour_id = $airticket_tour_id";
$conn->query($query);

mysqli_close($conn);
?>
