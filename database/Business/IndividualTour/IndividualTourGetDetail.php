<?php include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];


//  添加mco_invoice
// 添加确认收款时间 settle_time
// 添加以下信用卡 的 勾
// 没有信用卡信息的话，能不能把信用卡部分隐藏？

$query = "SELECT
              i.product_code,
              s.salesperson_code,
              i.tour_name,
              w.wholesaler_code,
              i.indiv_tour_invoice,
              cs.source_name,
              t.note,
              dl.us_class,
              dl.first_class,
              dl.second_class,
              dl.third_class,
              DATE_FORMAT(i.depart_date, '%Y-%m-%d') AS depart_date,
              DATE_FORMAT(i.arrival_date, '%Y-%m-%d') AS arrival_date,
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
              c.zipcode,
              mp.mco_party,
              mp.face_value,
              mp.mco_value,
              mp.mco_credit,
              mp.fee_ratio,
              mp.face_currency,
              mp.mco_currency,
              mp.mco_credit_currency,
              mi.cardholder,
              mi.card_number,
              mi.exp_date,
              ua.account_id, 
              (SELECT invoice FROM FinanceStatus WHERE ending = 'mco' AND transaction_id = t.transaction_id) AS mco_invoice, 
              t.confirm_payment_time, 
              (SELECT group_concat(z.transaction_id SEPARATOR ',')
                FROM Transactions z
                WHERE z.tc_id = t.tc_id
                GROUP BY z.tc_id) AS collection_info, 
              t.tc_id
          FROM Transactions t
          JOIN IndividualTour i ON t.indiv_tour_id = i.indiv_tour_id
          JOIN Salesperson s ON i.salesperson_id = s.salesperson_id
          JOIN Customer c ON i.customer_id = c.customer_id
          JOIN Wholesaler w ON w.wholesaler_id = i.wholesaler_id
          LEFT JOIN DestinationList dl ON dl.dl_id = i.dl_id
          LEFT JOIN McoPayment mp ON i.mp_id = mp.mp_id
          LEFT JOIN McoInfo mi ON mp.mco_id = mi.mco_id
          LEFT JOIN NoticeBoard nb ON nb.notice_id = mi.notice_id
          LEFT JOIN NoticeTarget nt ON nt.notice_id = nb.notice_id
          LEFT JOIN UserAccount ua ON nt.target_id = ua.user_id
          LEFT JOIN CustomerSource cs ON cs.source_id = t.source_id
          WHERE t.transaction_id = '$transactionId'";
// echo $query; 
$result = $conn->query($query);
if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
}

mysqli_close($conn);
?>
