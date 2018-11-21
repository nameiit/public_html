<?php
include('../../dbConnection.php');

$transactionId = $_GET['transaction_id'];

$query = "SELECT
                g.group_code,
                g.group_tour_invoice,
                g.flight_number,
                g.bus_company,
                s.salesperson_code,
                cs.source_name ,
                g.leader_number,
                g.tourist_number,
                t.note,
                g.start_date,
                g.end_date,
                g.duration,
                g.exchange_rate_usd_rmb,
                g.reserve,
                g.reserve_currency,
                g.total_cost,
                g.total_cost_currency,
                g.total_write_off,
                g.total_write_off_currency,
                t.total_profit,
                g.cc_id,
                g.coupon,
                (SELECT code FROM CouponCode WHERE cc_id = g.cc_id) as cc_code,
                g.coupon_currency,
                (SELECT process FROM ReceivedConfirmed r WHERE r.transaction_id = t.transaction_id) as process
            FROM GroupTour g
            JOIN Transactions t ON g.group_tour_id = t.group_tour_id
            LEFT JOIN GroupTourReceived gr ON g.group_tour_id = gr.group_tour_id
            LEFT JOIN GroupTourGuideDetails gw ON g.group_tour_id = gw.group_tour_id
            LEFT JOIN TouristGuide gg ON gw.guide_id = gg.guide_id
            LEFT JOIN Salesperson s ON t.salesperson_id = s.salesperson_id
            LEFT JOIN CustomerSource cs ON t.source_id = cs.source_id
            WHERE t.transaction_id = '$transactionId'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
}

mysqli_close($conn);
?>
