<?php
include('../../dbConnection.php');

$transactionId = $_POST['transaction_id'];

$query = "SELECT group_tour_id FROM Transactions WHERE transaction_id = '$transactionId'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $groupTourId = $result->fetch_assoc()['group_tour_id'];
}

$sql = "DELETE FROM UpdateLog WHERE transaction_id = 'transactionId'";
$conn->query($sql);

$query = "DELETE FROM Transactions WHERE transaction_id = '$transactionId'";
$conn->query($query);

$query = "DELETE FROM GroupTourGuideDetails WHERE group_tour_id  = '$groupTourId'";
$conn->query($query);

$query = "DELETE FROM GroupTourReceived WHERE group_tour_id  = '$groupTourId'";
$conn->query($query);

$query = "DELETE FROM GroupTour WHERE group_tour_id  = '$groupTourId'";
$conn->query($query);

mysqli_close($conn);
?>
