<?php
include('../dbConnection.php');

class UserAdmin {
    function createUser() {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $user_group = $_POST['user_group'];
        $user_group_id = "";

        $options = array(
            // 'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
            'cost' => 10
        );
        $password_hash = password_hash($password, PASSWORD_BCRYPT, $options);

        global $conn;

        $sql = "SELECT user_group_id FROM UserGroup WHERE group_name = '$user_group'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $user_group_id = $result->fetch_assoc()['user_group_id'];
        }

        $sql = "INSERT INTO UserAccount (account_id, password, user_group_id) VALUES ('$username', '$password_hash', $user_group_id)";
        echo $sql;
        $conn->query($sql);
    }

    function updatePassword() {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $options = array(
            // 'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
            'cost' => 10
        );
        $password_hash = password_hash($password, PASSWORD_BCRYPT, $options);

        global $conn;

        $sql = "UPDATE UserAccount SET password = '$password_hash' WHERE account_id = '$username'";
        $conn->query($sql);
    }

    function getUsers () {
        global $conn;

        $account_id = empty($_GET['account_id'])? '%' : $_GET['account_id'];

        $sql = "SELECT account_id, user_group_id, last_time_login FROM UserAccount WHERE account_id LIKE '$account_id'";
        $result = $conn->query($sql);

        $res = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return json_encode($res);
    }
}


$userAdmin = new UserAdmin();
if ($_POST['action'] == 'createUser') {
    $result = $userAdmin->createUser();
} else if ($_POST['action'] == 'updatePassword') {
    $result = $userAdmin->updatePassword();
} else if ($_GET['action'] == 'getUsers') {
    $result = $userAdmin->getUsers();
}

echo $result;

mysqli_close($conn);
?>
