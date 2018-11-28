<?php
include('../../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$offset = $_GET['offset'];

$sql = "SELECT
            r.notice_id, u.account_id,
            r.request_time, r.transaction_id,
            concat(REPLACE(REPLACE(REPLACE(t.type, 'group', '独立团'), 'individual', '散拼团'), 'airticket', '机票'), ' ',
                   IFNULL(
                            concat(g.received_currency, ' ', g.shin_received),
                            IFNULL(
                                    concat(a.sale_currency, ' ', a.received),
                                    concat(i.sale_currency, ' ', i.received)
                            )
                   )
            ) as content,
            r.request_type
        FROM ReceivedConfirmed r
        JOIN NoticeTarget nt
        ON r.notice_id = nt.notice_id
        JOIN UserAccount u
        ON r.sent_by = u.user_id
        JOIN Transactions t
        ON r.transaction_id = t.transaction_id
        LEFT JOIN AirticketTour a
        ON t.airticket_tour_id = a.airticket_tour_id
        LEFT JOIN GroupTour g
        ON t.group_tour_id = g.group_tour_id
        LEFT JOIN IndividualTour i
        ON t.indiv_tour_id = i.indiv_tour_id
        WHERE nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
        AND r.process <> 'confirmed'
        ORDER BY r.request_time ASC
        LIMIT 20
        OFFSET $offset";
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
