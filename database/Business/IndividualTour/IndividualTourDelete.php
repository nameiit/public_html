<?php include('../../dbConnection.php');

$transactionId = $_POST['transaction_id'];

$query = "SELECT indiv_tour_id FROM Transactions WHERE transaction_id = '$transactionId'";
$result = $conn->query($query);
$indiv_tour_id = $result->fetch_assoc()['indiv_tour_id'];

$sql = "DELETE FROM UpdateLog WHERE transaction_id = '$transactionId'";
$conn->query($sql);

$query = "DELETE FROM Transactions WHERE transaction_id = '$transactionId'";
$conn->query($query);

$query = "DELETE FROM IndividualTour WHERE indiv_tour_id = '$indiv_tour_id'";
$conn->query($query);

$query = "DELETE FROM FinanceStatus WHERE transaction_id = '$transactionId'";
$conn->query($query);

mysqli_close($conn);
?>
