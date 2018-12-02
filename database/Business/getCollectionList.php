<?php include('../dbConnection.php');

$collection_id = $_GET['collection_id'];

// $sql = "SELECT
//           t.transaction_id, s.salesperson_code,
//           (
//            SELECT GROUP_CONCAT(following_id SEPARATOR ',')
//            FROM TransactionCollections
//            WHERE starter_id = '$collection_id'
//            GROUP BY starter_id
//           ) AS following_id
//         FROM Transactions t
//         JOIN AirticketTour a
//         ON a.airticket_tour_id = t.airticket_tour_id
//         JOIN Salesperson s
//         ON a.salesperson_id = s.salesperson_id
//         WHERE t.transaction_id = $collection_id";
$sql = "SELECT tc_id FROM Transactions WHERE transaction_id = '$collection_id'";
$result = $conn->query($sql);
$tc_id = $result->fetch_assoc()['tc_id'];

$sql = "SELECT t.tc_id AS transaction_id, GROUP_CONCAT(t.transaction_id SEPARATOR ',') AS following_id
        FROM Transactions t
        WHERE t.tc_id = '$tc_id'
        GROUP BY t.tc_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode($result->fetch_assoc());
} else {
  echo "Not exist transactions!";
}


mysqli_close($conn);
 ?>
