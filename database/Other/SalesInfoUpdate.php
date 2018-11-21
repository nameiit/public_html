<?php
include('../dbConnection.php');

class SalesInfoUpdate {
    function getSalesInfo() {
        $salesperson_code = $_GET['salesperson_code'];
        global $conn;

        $sql = "SELECT fname, lname, gender, phone, department_id, email, description
                FROM Salesperson WHERE salesperson_code = '$salesperson_code'";
        $result = $conn->query($sql);

        $res = array();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $res = $row;
            $department_id = $res['department_id'];
            $sql = "SELECT department_name FROM Department WHERE department_id = '$department_id'";
            $result = $conn->query($sql);
            $department_name = $result->fetch_assoc()['department_name'];
            $res['department_name'] = $department_name;
        }
        return json_encode($res);
    }

    function updateSalesInfo() {
        global $conn;

        $salesperson_code = $_POST['salesperson_code'];
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $gender = $_POST['gender'];
        $phone = $_POST['phone'];
        $department_name = $_POST['department'];
        $email = $_POST['email'];
        $description = $_POST['description'];

        $sql = "SELECT department_id FROM Department WHERE department_name = '$department_name'";
        $result = $conn->query($sql);
        $department_id = $result->fetch_assoc()['department_id'];

        $sql = "SELECT * FROM Salesperson WHERE salesperson_code = '$salesperson_code'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $sql = "UPDATE Salesperson
                  SET
                      fname = '$fname',
                      lname = '$lname',
                      gender = '$gender',
                      phone = '$phone',
                      department_id = '$department_id',
                      email = '$email',
                      description = '$description'
                  WHERE salesperson_code = '$salesperson_code'";
          $conn->query($sql);
        } else {
          $sql = "INSERT INTO Salesperson
                      (
                          lname, fname, salesperson_code, gender, phone, department_id, email, description
                      ) VALUES (
                          '$lname', '$fname', '$salesperson_code', '$gender', '$phone', '$department_id', '$email', '$description'
                      )";
          $conn->query($sql);
        }
    }

    function updatePassword() {
        global $conn;

        $salesperson_code = $_POST['salesperson_code'];
        $new_password = $_POST['new_password'];

        $options = array(
            // 'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
            'cost' => 10
        );
        $password_hash = password_hash($new_password, PASSWORD_BCRYPT, $options);

        $sql = "UPDATE UserAccount SET password = '$password_hash' WHERE account_id = '$salesperson_code'";
        $conn->query($sql);
    }
}

$salesInfoUpdate = new SalesInfoUpdate();

if ($_GET['action'] == 'getSalesInfo') {
    $result = $salesInfoUpdate->getSalesInfo();
} else if ($_POST['action'] == 'updateSalesInfo') {
    $result = $salesInfoUpdate->updateSalesInfo();
} else if ($_POST['action'] == 'updatePassword') {
    $result = $salesInfoUpdate->updatePassword();
}

echo $result;

mysqli_close($conn);
?>
