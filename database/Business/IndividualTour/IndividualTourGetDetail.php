<?php include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];

$query = "SELECT
              i.product_code,
              s.salesperson_code,
              i.tour_name,
              w.wholesaler_code,
              i.indiv_tour_invoice,
              cs.source_name,
              t.note,
              dl.us_layer,
              dl.first_layer,
              dl.second_layer,
              dl.third_layer,
              DATE_FORMAT(t.depart_date, '%Y-%m-%d') AS depart_date,
              DATE_FORMAT(t.arrival_date, '%Y-%m-%d') AS arrival_date,
              DATEDIFF(i.arrival_date, i.depart_date) + 1 AS duration,
              i.exchange_rate,
              i.deal_location,
              i.selling_price,
              i.selling_currency,
              i.base_price,
              i.base_currency,
              i.payment_type,
              t.total_profit,
              c.lname,
              c.fname,
              c.phone,
              c.other_contact_type,
              c.other_contact_number,
              c.birth_date,
              c.gender,
              c.email,
              c.zipcode
          FROM Transactions t
          JOIN IndividualTour i
          ON t.indiv_tour_id = i.indiv_tour_id
          LEFT JOIN DestinationList dl
          ON dl.dl_id = i.dl_id
          JOIN Salesperson s
          ON i.salesperson_id = s.salesperson_id
          JOIN Customer c
          ON i.customer_id = c.customer_id
          JOIN Wholesaler w
          ON w.wholesaler_id = i.wholesaler_id
          JOIN CustomerSource cs
          ON cs.source_id = t.source_id
          JOIN FinanceStatus fs
          ON fs.transaction_id = t.transaction_id
          WHERE t.transaction_id = '$transactionId'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
}

mysqli_close($conn);
?>
