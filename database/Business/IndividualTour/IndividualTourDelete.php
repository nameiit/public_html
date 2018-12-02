<?php include('../../dbConnection.php');

$transactionId = $_POST['transaction_id'];

$query = "SELECT indiv_tour_id FROM Transactions WHERE transaction_id = '$transactionId'";
$result = $conn->query($query);
$indiv_tour_id = $result->fetch_assoc()['indiv_tour_id'];

$query = "DELETE FROM AuditProcess 
          WHERE fs_id IN (SELECT fs_id FROM FinanceStatus WHERE transaction_id = $transactionId)";
$conn->query($query);
$query = "DELETE FROM FinanceStatus WHERE transaction_id = $transactionId";
$conn->query($query);
$query = "DELETE FROM LogLastEditor WHERE transaction_id = $transactionId";
$conn->query($query);

$query = "DELETE FROM ExtraSupplement WHERE transaction_id = $transactionId";
$conn->query($query);
$query = "DELETE FROM Refund WHERE transaction_id = $transactionId";
$conn->query($query);

$query = "DELETE FROM Transactions WHERE transaction_id = $transactionId";
$conn->query($query);

$query = "SELECT IFNULL(mp_id, 'KK') AS mp_id FROM IndividualTour WHERE indiv_tour_id = $indiv_tour_id";
$result = $conn->query($query);
$mp_id = $result->fetch_assoc()['mp_id'];
$query = "DELETE FROM IndividualTour WHERE indiv_tour_id = $indiv_tour_id";
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

mysqli_close($conn);
?>
