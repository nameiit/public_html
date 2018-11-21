<?php
include('dbConnection.php');
session_start();


class indexDB {
    function getEventNotice($login_username) {
      global $conn;
      $sql = "SELECT
                  IFNULL(
                      n.content, concat('MCO ID: ', n.notice_id, ' ', REPLACE(REPLACE(m.used, 'Y', '已完成'), 'N', '未完成'))
                  ) as content,
                  n.category,
                  n.gotop
              FROM NoticeBoard n
              LEFT JOIN McoInfo m
              ON n.notice_id = m.notice_id
              JOIN NoticeTarget nt
              ON n.notice_id = nt.notice_id
              WHERE n.valid_until >= CURRENT_DATE
              AND nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = '$login_username')
              AND gotop = 'Y'
              AND n.category <> 'receivedrequest'
              ORDER BY n.notice_id DESC";
      $result = $conn->query($sql);

      $res = array();
      $content = array();
      $category = array();
      $gotop = array();

      if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
              $content[] = $row['content'];
              $category[] = $row['category'];
              $gotop[] = $row['gotop'];
          }
      }

      $sql = "SELECT
                  IFNULL(
                      n.content, concat('MCO ID: ', n.notice_id, ' ', REPLACE(REPLACE(m.used, 'Y', '已完成'), 'N', '未完成'))
                  ) as content,
                  n.category,
                  n.gotop
              FROM NoticeBoard n
              LEFT JOIN McoInfo m
              ON n.notice_id = m.notice_id
              JOIN NoticeTarget nt
              ON n.notice_id = nt.notice_id
              WHERE n.valid_until >= CURRENT_DATE
              AND nt.target_id = (SELECT user_id FROM UserAccount WHERE account_id = 'sj')
              AND gotop = 'N'
              AND n.category <> 'receivedrequest'
              ORDER BY n.notice_id DESC";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
              $content[] = $row['content'];
              $category[] = $row['category'];
              $gotop[] = $row['gotop'];
          }
      }

      array_push($res, $content);
      array_push($res, $category);
      array_push($res, $gotop);

      return json_encode($res);
    }


    function getSaleList() {
        global $conn;

        $sql1 = "SELECT concat(s.lname, ' ', s.fname) AS salesperson_name,
                IFNULL(t1_usd.sum_profit, 0)+IFNULL(t2_rmb.sum_profit, 0) AS sum_usd_profit
                FROM Salesperson s
                LEFT JOIN
                (
                SELECT salesperson_id, sum(total_profit) AS sum_profit, type
                FROM Transactions WHERE
                currency = 'USD' AND
                create_time <= current_timestamp AND
                create_time >= current_timestamp - interval 7000 day AND
                type = 'group'
                GROUP BY salesperson_id
                ) t1_usd
                ON s.salesperson_id = t1_usd.salesperson_id
                LEFT JOIN
                (
                SELECT salesperson_id, sum(total_profit)/(SELECT value FROM OtherInfo WHERE name = 'default_currency') AS sum_profit, type
                FROM Transactions WHERE
                currency = 'RMB' AND
                create_time <= current_timestamp AND
                create_time >= current_timestamp - interval 7 day AND
                type = 'group'
                GROUP BY salesperson_id
                ) t2_rmb
                ON s.salesperson_id = t2_rmb.salesperson_id
                ORDER BY sum_usd_profit DESC LIMIT 1";

        $sql2 = "SELECT
                    concat(s.lname, ' ', s.fname) AS salesperson_name,
                    IFNULL(t1_usd.sum_profit, 0) + IFNULL(t2_rmb.sum_profit, 0) AS sum_usd_profit
                FROM Salesperson s
                LEFT JOIN
                (
                    SELECT salesperson_id, sum(total_profit) AS sum_profit, type
                    FROM Transactions
                    WHERE currency = 'USD'
                    AND create_time <= current_timestamp
                    AND create_time >= current_timestamp - interval 7 day
                    AND type = 'individual'
                    GROUP BY salesperson_id
                ) t1_usd
                ON s.salesperson_id = t1_usd.salesperson_id
                LEFT JOIN
                (
                    SELECT salesperson_id, sum(total_profit)/(SELECT value FROM OtherInfo WHERE name = 'default_currency') AS sum_profit, type
                    FROM Transactions
                    WHERE currency = 'RMB'
                    AND create_time <= current_timestamp
                    AND create_time >= current_timestamp - interval 7 day
                    AND type = 'individual'
                    GROUP BY salesperson_id
                ) t2_rmb
                ON s.salesperson_id = t2_rmb.salesperson_id
                ORDER BY sum_usd_profit DESC
                LIMIT 1";

        $sql3 = "SELECT
                    concat(s.lname, ' ', s.fname) AS salesperson_name,
                    IFNULL(t1_usd.sum_profit, 0) + IFNULL(t2_rmb.sum_profit, 0) AS sum_usd_profit
                FROM Salesperson s
                LEFT JOIN
                (
                    SELECT salesperson_id, sum(total_profit) AS sum_profit, type
                    FROM Transactions
                    WHERE currency = 'USD'
                    AND create_time <= current_timestamp
                    AND create_time >= current_timestamp - interval 7000 day
                    AND type = 'airticket'
                    GROUP BY salesperson_id
                ) t1_usd
                ON s.salesperson_id = t1_usd.salesperson_id
                LEFT JOIN
                (
                    SELECT salesperson_id, sum(total_profit)/(SELECT value FROM OtherInfo WHERE name = 'default_currency') AS sum_profit, type
                    FROM Transactions
                    WHERE currency = 'RMB'
                    AND create_time <= current_timestamp
                    AND create_time >= current_timestamp - interval 7000 day
                    AND type = 'airticket'
                    GROUP BY salesperson_id
                ) t2_rmb
                ON s.salesperson_id = t2_rmb.salesperson_id
                ORDER BY sum_usd_profit DESC LIMIT 1";

        $result1 = $conn->query($sql1);
        $result2 = $conn->query($sql2);
        $result3 = $conn->query($sql3);

        $res = array();
        $name = array();

        if ($result1->num_rows > 0) {
            while($row = $result1->fetch_assoc()) {
                $name[] = $row['salesperson_name'];

            }
        }
        if ($result2->num_rows > 0) {
            while($row = $result2->fetch_assoc()) {
                $name[] = $row['salesperson_name'];

            }
        }
        if ($result3->num_rows > 0) {
            while($row = $result3->fetch_assoc()) {
                $name[] = $row['salesperson_name'];

            }
        }

        array_push($res, $name);


        return json_encode($res);

    }

    function getOrderAmount() {
        global $conn;


        $group_name = $_SESSION["group_name"];

        if($group_name=="normal"){
          $accid = $_SESSION['username'];

        }else{
          $accid = "%";

        }

        $totalUSDsql = "SELECT sum(total_profit) totalusd FROM Transactions WHERE currency = 'USD'";
        if ($group_name == "normal") {
          $username = $_SESSION['username'];
          $temp = "(SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$username')";
          $totalUSDsql .= " AND salesperson_id =" . $temp;
        } else {
          $totalUSDsql .= " AND salesperson_id LIKE '$accid'";
        }
        // AND salesperson_id = (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
        $totalUSDsql .= " AND create_time <= current_timestamp AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        // echo $totalUSDsql;

        $totalUSDresult = $conn->query($totalUSDsql);

        $totalRMBsql = "SELECT sum(total_profit) / (SELECT value FROM OtherInfo WHERE name = 'default_currency') totalrmb FROM Transactions WHERE currency = 'RMB'";
        if ($group_name == "normal") {
          $username = $_SESSION['username'];
          $temp = "(SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$username')";
          $totalRMBsql .= " AND salesperson_id =" . $temp;
        } else {
          $totalRMBsql .= " AND salesperson_id LIKE '%'";
        }
        $totalRMBsql .= " AND create_time <= current_timestamp AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";


        $totalRMBresult = $conn->query($totalRMBsql);

        $totalCountsql = "SELECT count(*) totalcount FROM Transactions
        WHERE salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '%')
        AND create_time <= current_timestamp
        AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";
        // echo $totalCountsql;
        $totalCountresult = $conn->query($totalCountsql);


        // --------------------------group

        $groupUSDsql = "SELECT sum(total_profit) groupusd FROM Transactions
                        WHERE currency = 'USD'
                        AND type = 'group'
                        AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                        AND create_time <= current_timestamp
                        AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $groupUSDresult = $conn->query($groupUSDsql);

        $groupRMBsql = "SELECT sum(total_profit) / (SELECT value FROM OtherInfo grouprmb WHERE name = 'default_currency') grouprmb FROM Transactions
                        WHERE currency = 'RMB'
                        AND type = 'group'
                        AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                        AND create_time <= current_timestamp
                        AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01');";

        $groupRMBresult = $conn->query($groupRMBsql);

        $groupCountsql = "SELECT count(*) groupcount FROM Transactions
                          WHERE type = 'group'
                          AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                          AND create_time <= current_timestamp
                          AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01');";

        $groupCountresult = $conn->query($groupCountsql);


        //------------------------- individual

        $individualUSDsql = "SELECT sum(total_profit) individualusd FROM Transactions
                                WHERE currency = 'USD'
                                AND type = 'individual'
                                AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                                AND create_time <= current_timestamp
                                AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $individualUSDresult = $conn->query($individualUSDsql);

        $individualRMBsql = "SELECT sum(total_profit) / (SELECT value FROM OtherInfo WHERE name = 'default_currency') individualrmb FROM Transactions
                                WHERE currency = 'RMB'
                                AND type = 'individual'
                                AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                                AND create_time <= current_timestamp
                                AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $individualRMBresult = $conn->query($individualRMBsql);

        $individualCountsql = "SELECT count(*) individualcount FROM Transactions
                                WHERE salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                                AND type = 'individual'
                                AND create_time <= current_timestamp
                                AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $individualCountresult = $conn->query($individualCountsql);

        //-----------------------------------------------------------airticket

        $airticketUSDsql = "SELECT sum(total_profit) airticketusd FROM Transactions
                            WHERE currency = 'USD'
                            AND type = 'airticket'
                            AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                            AND create_time <= current_timestamp
                            AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $airticketUSDresult = $conn->query($airticketUSDsql);

        $airticketRMBsql = "SELECT sum(total_profit) / (SELECT value FROM OtherInfo WHERE name = 'default_currency') airticketrmb FROM Transactions
                            WHERE currency = 'RMB'
                            AND type = 'airticket'
                            AND salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                            AND create_time <= current_timestamp
                            AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $airticketRMBresult = $conn->query($airticketRMBsql);

        $airticketCountsql = "SELECT count(*) airticketcount FROM Transactions
                                WHERE salesperson_id in (SELECT salesperson_id FROM Salesperson WHERE salesperson_code like '$accid')
                                AND type = 'airticket'
                                AND create_time <= current_timestamp
                                AND create_time >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')";

        $airticketCountresult = $conn->query($airticketCountsql);








        //--------------------------------------------------------------

        $res = array();
        $totalusd = 0;
        $totalrmb = 0;
        $totalcount = 0;

        $groupusd = 0;
        $grouprmb = 0;
        $groupcount = 0;

        $individualusd = 0;
        $individualrmb = 0;
        $individualcount = 0;

        //-------------------total

        if ($totalUSDresult->num_rows > 0) {
            while($row = $totalUSDresult->fetch_assoc()) {
                $totalusd = $row['totalusd'];

            }
        }

        if ($totalRMBresult->num_rows > 0) {
            while($row = $totalRMBresult->fetch_assoc()) {
                $totalrmb = $row['totalrmb'];

            }
        }


        if ($totalCountresult->num_rows > 0) {
            while($row = $totalCountresult->fetch_assoc()) {
                $totalcount = $row['totalcount'];

            }
        }

        //-----------------------------group

        if ($groupUSDresult->num_rows > 0) {
            while($row = $groupUSDresult->fetch_assoc()) {
                $groupusd = $row['groupusd'];

            }
        }

        if ($groupRMBresult->num_rows > 0) {
            while($row = $groupRMBresult->fetch_assoc()) {
                $grouprmb = $row['grouprmb'];

            }
        }


        if ($groupCountresult->num_rows > 0) {
            while($row = $groupCountresult->fetch_assoc()) {
                $groupcount = $row['groupcount'];

            }
        }

        //-----------------------------individual

        if ($individualUSDresult->num_rows > 0) {
            while($row = $individualUSDresult->fetch_assoc()) {
                $individualusd = $row['individualusd'];

            }
        }

        if ($individualRMBresult->num_rows > 0) {
            while($row = $individualRMBresult->fetch_assoc()) {
                $individualrmb = $row['individualrmb'];

            }
        }


        if ($individualCountresult->num_rows > 0) {
            while($row = $individualCountresult->fetch_assoc()) {
                $individualcount = $row['individualcount'];

            }
        }


        //-------------------------------- airticket

        if ($airticketUSDresult->num_rows > 0) {
            while($row = $airticketUSDresult->fetch_assoc()) {
                $airticketusd = $row['airticketusd'];

            }
        }

        if ($airticketRMBresult->num_rows > 0) {
            while($row = $airticketRMBresult->fetch_assoc()) {
                $airticketrmb = $row['airticketrmb'];

            }
        }


        if ($airticketCountresult->num_rows > 0) {
            while($row = $airticketCountresult->fetch_assoc()) {
                $airticketcount = $row['airticketcount'];

            }
        }

        array_push($res, $totalusd);
        array_push($res, $totalrmb);
        array_push($res, $totalcount);

        array_push($res, $groupusd);
        array_push($res, $grouprmb);
        array_push($res, $groupcount);

        array_push($res, $individualusd);
        array_push($res, $individualrmb);
        array_push($res, $individualcount);

        array_push($res, $airticketusd);
        array_push($res, $airticketrmb);
        array_push($res, $airticketcount);

        return json_encode($res);
    }
}
//session_start();
$login_username = $_SESSION["username"];

$indexDB = new indexDB();
if ($_POST['action'] == 'getEventNotice') {
  $result = $indexDB->getEventNotice($login_username);
}
else if ($_POST['action'] == 'getOrderAmount') {
  $result = $indexDB->getOrderAmount();
}
else if ($_POST['action'] == 'getSaleList') {
  $result = $indexDB->getSaleList();
}
echo $result;

mysqli_close($conn);
?>
