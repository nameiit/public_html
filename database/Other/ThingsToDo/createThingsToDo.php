<?php
include('../../dbConnection.php');

session_start();
$title = $_POST['title'];
$content = $_POST['content'];
$importance = $_POST['important'];
$type = $_POST['type'];
$addtime = $_POST['addtime'];
$accid = $_SESSION['username'];

if ($addtime=='no'){
  $sql = "INSERT INTO ThingsToDo
          (
            create_time, content, user_id, importance, type, title
          )
          VALUES
          (
            CURRENT_DATE,'$content',
            (select user_id from UserAccount where account_id = '$accid'),
            '$importance','$type', '$title'
          )";
}else{
  $sql = "INSERT INTO ThingsToDo
          (
            create_time, content, user_id, importance, type, title
          )
          VALUES
          (
            '$addtime','$content',
            (select user_id from UserAccount where account_id = '$accid'),
            '$importance','$type', '$title'
          )";
}
$result = $conn->query($sql);
echo $res;

mysqli_close($conn);
?>
