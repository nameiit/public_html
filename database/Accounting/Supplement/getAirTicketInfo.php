<?php
 include('../../dbConnection.php');

 $transaction_id = $_GET['transaction_id'];
 $ticket_number = empty($_GET['ticket_number']) ? '%' : $_GET['ticket_number'];
 $locator = empty($_GET['locator']) ? '%' : $_GET['locator'];
 $invoice = empty($_GET['invoice']) ? '%' : $_GET['invoice'];

 $sql = "SELECT
             t.transaction_id,
             IFNULL(REPLACE(REPLACE(fs.ending, 'sup', '增补'), 'ref', '退款'), '订单') AS type,
             fs.invoice,
             fs.total_profit,
             fs.selling_price,
             fs.received,
             fs.debt,
             fs.debt_cleared
         FROM Transactions t
         JOIN FinanceStatus fs ON t.transaction_id = fs.transaction_id
         JOIN AirticketTour a ON t.airticket_tour_id = a.airticket_tour_id
         WHERE t.transaction_id LIKE '$transaction_id'
         AND a.airticket_tour_id IN (SELECT airticket_tour_id FROM AirticketNumber WHERE airticket_number LIKE '$ticket_number')
         AND a.locators LIKE '$locator'
         AND fs.invoice LIKE '$invoice'
         AND t.type = 'airticket'";
 $result = $conn->query($sql);

 $res = array();
 if ($result->num_rows > 0) {
     while($row = $result->fetch_assoc()) {
         $res[] = $row;
     }
 }

 echo json_encode($res);

 mysqli_close($conn);
?>
