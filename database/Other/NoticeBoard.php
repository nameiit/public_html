<?php
include('../dbConnection.php');

class NoticeBoard {
  function getNotExpiredNotice() {
    global $conn;

    $sql = "SELECT n.notice_id, 
                   n.category, 
                   u.account_id AS edited_by, 
                   n.content
            FROM NoticeBoard n
            JOIN UserAccount u
            ON n.edited_by = u.user_id
            WHERE n.valid_until >= CURRENT_DATE
            AND n.category <> 'MCO' 
            AND n.category <> 'receivedrequest'
            ORDER BY n.notice_id DESC";
    $result = $conn->query($sql);

    $res = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $res[] = $row;
        }
    }

    return json_encode($res);
  }

  function getAllNotice() {
    global $conn;

    $sql = "SELECT n.notice_id, n.category, u.account_id AS edited_by, n.content, n.valid_until
            FROM NoticeBoard n
            JOIN UserAccount u
            ON n.edited_by = u.user_id
            WHERE n.category <> 'MCO'
            AND n.category <> 'receivedrequest'
            ORDER BY n.notice_id DESC";
    $result = $conn->query($sql);

    $res = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $res[] = $row;
        }
    }

    return json_encode($res);
  }

  function getNotExpiredMCO($login_username) {
    global $conn;

    $sql = "SELECT n.notice_id, n.category, u.account_id AS edited_by,
              IFNULL(n.content, concat('Card Holder: ', IFNULL(m.cardholder, 'NULL'), '\n',
                'Card Number: ', IFNULL(m.card_number, 'NULL'),  '\n',
                'EXP Date: ', IFNULL(m.exp_date, 'NULL'), '\n',
                'Security Code: ', IFNULL(m.security_code, 'NULL'), '\n',
                'Billing Address: ', IFNULL(m.billing_address, 'NULL'), '\n',
                'Issuing Bank Phone: ', IFNULL(m.phone_issuing_bank, 'NULL'), '\n',
                'Currency: ', IFNULL(m.charging_amount_currency, 'NULL'), '\n',
                'Amount: ', IFNULL(m.charging_amount, 'NULL'),  '\n'
              )) AS 'content'
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
            ORDER BY n.notice_id DESC";
    $result = $conn->query($sql);

    $res = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $res[] = $row;
        }
    }

    return json_encode($res);
  }

  function getAllMCO($login_username) {
    global $conn;

    $sql = "SELECT n.notice_id, n.category, u.account_id AS edited_by,
              IFNULL(n.content, concat('Card Holder: ', IFNULL(m.cardholder, 'NULL'), '\n',
                'Card Number: ', IFNULL(m.card_number, 'NULL'),  '\n',
                'EXP Date: ', IFNULL(m.exp_date, 'NULL'), '\n',
                'Security Code: ', IFNULL(m.security_code, 'NULL'), '\n',
                'Billing Address: ', IFNULL(m.billing_address, 'NULL'), '\n',
                'Issuing Bank Phone: ', IFNULL(m.phone_issuing_bank, 'NULL'), '\n',
                'Currency: ', IFNULL(m.charging_amount_currency, 'NULL'), '\n',
                'Amount: ', IFNULL(m.charging_amount, 'NULL'),  '\n'
              )) AS 'content', n.valid_until
            FROM NoticeBoard n
            JOIN McoInfo m
            ON n.notice_id = m.notice_id
            JOIN NoticeTarget nt
            ON n.notice_id = nt.notice_id
            JOIN UserAccount u
            ON n.edited_by = u.user_id
            WHERE category = 'MCO'
            AND nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
            ORDER BY n.notice_id DESC";
    $result = $conn->query($sql);

    $res = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $res[] = $row;
        }
    }

    return json_encode($res);
  }

  function createNotice ($login_username) {
    global $conn;

    $category = $_POST['category'];
    $valid_until = $_POST['valid_until'];
    $go_to = $_POST['go_top'];
    $target = $_POST['target'];
    $notice_content= $_POST['notice_content'];

    $sql = "INSERT INTO NoticeBoard
              (valid_until, edited_by, content, gotop, category)
            VALUES
              ('$valid_until', (SELECT user_id FROM UserAccount WHERE account_id = '$login_username'), '$notice_content', '$go_to', '$category')";
    // echo $sql;
    $conn->query($sql);

    $sql = "SELECT max(notice_id) as notice_id FROM NoticeBoard WHERE edited_by = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')";
    $result = $conn->query($sql);
    $notice_id = $result->fetch_assoc()['notice_id'];

    $target_list = array();
    if ($target == 'all' or $target == 'sales' or $target == 'accounting') {
      if ($target == 'all') {
        $sql = "SELECT user_id FROM UserAccount";
      } else if ($target == 'sales') {
        $sql = "SELECT user_id FROM UserAccount WHERE user_group_id = 1";
      } else if ($target == 'accounting') {
        $sql = "SELECT user_id FROM UserAccount WHERE user_group_id = 2";
      }
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
              $target_list[] = $row['user_id'];
          }
      }
    } else {
      $target = explode(";", $target);
      for ($i = 0; $i < sizeof($target); $i++) {
        $sql = "SELECT user_id FROM UserAccount WHERE account_id = '$target[$i]'";
        $result = $conn->query($sql);
        $target_list[] = $result->fetch_assoc()['user_id'];
      }
    }

    for ($i = 0; $i < sizeof($target_list); $i++) {
      $sql = "INSERT INTO NoticeTarget (notice_id, target_id) VALUES ('$notice_id', '$target_list[$i]')";
      $conn->query($sql);
    }
  }
}

session_start();
$login_username = $_SESSION["username"];

$noticeBoard = new NoticeBoard();

if ($_GET['action'] == 'getNotExpiredNotice') {
  $result = $noticeBoard->getNotExpiredNotice();
} else if ($_GET['action'] == 'getAllNotice') {
  $result = $noticeBoard->getAllNotice();
} else if ($_GET['action'] == 'getNotExpiredMCO') {
  $result = $noticeBoard->getNotExpiredMCO($login_username);
} else if ($_GET['action'] == 'getAllMCO') {
  $result = $noticeBoard->getAllMCO($login_username);
} else if ($_POST['action'] == 'createNotice') {
  $result = $noticeBoard->createNotice($login_username);
}
echo $result;

mysqli_close($conn);
?>
