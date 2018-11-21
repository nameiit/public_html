<?php
include('../dbConnection.php');

$login_username = $_GET['username'];
$login_password = $_GET['password'];

$sql = "SELECT * FROM UserAccount WHERE account_id = '$login_username'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "User_Not_Exist";
} else {
    $row = $result->fetch_assoc();
    $hash_password = $row['password'];
    $user_group_id = $row['user_group_id'];
    $last_time_login = $row['last_time_login'];

    if (password_verify($login_password, $hash_password)) {
        $sql = "SELECT group_name FROM UserGroup WHERE user_group_id = $user_group_id";
        $result = $conn->query($sql);
        $group_name = $result->fetch_assoc()['group_name'];

        $sql = "UPDATE UserAccount SET last_time_login = CURRENT_TIMESTAMP WHERE account_id = '$login_username'";
        $conn->query($sql);

        session_start();
        $_SESSION["username"] = $login_username;
        $_SESSION["group_name"] = $group_name;
        $_SESSION["last_time_login"] = substr($last_time_login, 0, 10);
        $_SESSION["login"] = true;

        echo 'Password is valid!';
    } else {
        echo 'Invalid password.';
    }
}

mysqli_close($conn);
?>
