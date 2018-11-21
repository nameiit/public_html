<?php
include('../../dbConnection.php');

session_start();
$login_username = $_SESSION["username"];

$offset = $_GET['offset'];

$sql = "SELECT n.notice_id, n.category, u.account_id AS edited_by,
          IFNULL(n.content, concat('Card Holder: ', IFNULL(m.cardholder, 'NULL'), '\n',
            'Card Number: ', IFNULL(m.card_number, 'NULL'),  '\n',
            'EXP Date: ', IFNULL(m.exp_date, 'NULL'), '\n',
            'Security Code: ', IFNULL(m.security_code, 'NULL'), '\n',
            'Billing Address: ', IFNULL(m.billing_address, 'NULL'), '\n',
            'Issuing Bank Phone: ', IFNULL(m.phone_issuing_bank, 'NULL'), '\n',
            'Currency: ', IFNULL(m.charging_amount_currency, 'NULL'), '\n',
            'Amount: ', IFNULL(m.charging_amount, 'NULL'),  '\n'
          )) AS 'content', m.note, m.create_time
        FROM NoticeBoard n
        JOIN McoInfo m
        ON n.notice_id = m.notice_id
        JOIN NoticeTarget nt
        ON n.notice_id = nt.notice_id
        JOIN UserAccount u
        ON n.edited_by = u.user_id
        WHERE valid_until >= CURRENT_DATE
        AND category = 'MCO'
        AND nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
        AND m.used = 'N'
        ORDER BY n.notice_id DESC
        LIMIT 10 OFFSET $offset";
// echo $sql;
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
