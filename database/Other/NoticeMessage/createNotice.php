<?php
include('../../dbConnection.php');

global $conn;

session_start();
$login_username = $_SESSION["username"];

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

mysqli_close($conn);
?>
