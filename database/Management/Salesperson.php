<?php
include('../dbConnection.php');

class Salesperson {
    function getSalespersonList() {
        global $conn;
        $salesperson_code = ($_GET['salesperson_code'] == 'all') ? '%' : $_GET['salesperson_code'];
        $salesperson_name = ($_GET['salesperson_name'] == 'all') ? '%' : $_GET['salesperson_name'];
        $gender = ($_GET['gender'] == 'all') ? '%' : $_GET['gender'];
        $department = ($_GET['department'] == 'all') ? '%' : $_GET['department'];
        $status = ($_GET['status'] == 'all') ? '%' : $_GET['status'];
        $limit = (empty($_GET['limit'])) ? 0 : $_GET['limit'];

        $sql = "SELECT salesperson_id, salesperson_code, concat(fname, ' ', lname) as name, gender, phone, d.department_name, email, s.description, s.active_status
                FROM Salesperson s
                JOIN Department d
                ON s.department_id = d.department_id
                WHERE salesperson_code LIKE '$salesperson_code'
                AND (concat(fname, ' ', lname) LIKE '$salesperson_name' OR concat(lname, fname) LIKE '$salesperson_name')
                AND gender LIKE '$gender'
                AND s.active_status LIKE '$status'";
        if ($department != '%') {
            $sql .= "AND s.department_id LIKE (SELECT department_id FROM Department WHERE department_name LIKE '$department')";
        }
        $sql .= "ORDER BY salesperson_id DESC LIMIT $limit";

        $result = $conn->query($sql);
        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }
        return json_encode($rows);
    }

    function getSalespersonInfo() {
        global $conn;
        $salesperson_id = $_GET['salesperson_id'];

        $sql = "SELECT lname, fname, salesperson_code, gender, phone, d.department_name, email, s.description
                FROM Salesperson s
                JOIN Department d
                ON s.department_id = d.department_id
                WHERE salesperson_id = '$salesperson_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function updateSalesperson() {
        global $conn;
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $salesperson_code = $_POST['salesperson_code'];
        $gender = $_POST['gender'];
        $phone = $_POST['phone'];
        $department = $_POST['department'];
        $email = $_POST['email'];
        $description = (empty($_POST['description']))? NULL : $_POST['description'];
        $salesperson_id = $_POST['salesperson_id'];

        $sql = "UPDATE Salesperson
                SET
                    lname = '$lname',
                    fname = '$fname',
                    salesperson_code = '$salesperson_code',
                    gender = '$gender',
                    phone = '$phone',
                    department_id = (SELECT department_id FROM Department WHERE department_name = '$department'),
                    email = '$email',
                    description = '$description'
                WHERE salesperson_id = $salesperson_id";
        $conn->query($sql);
    }

    function insertSalesperson() {
        global $conn;
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $salesperson_code = $_POST['salesperson_code'];
        $gender = (empty($_POST['gender'])) ? 'UNKNOWN' : $_POST['gender'];
        $phone = (empty($_POST['phone'])) ? NULL : $_POST['phone'];
        $department = $_POST['department'];
        $email = (empty($_POST['email'])) ? NULL : $_POST['email'];
        $description = (empty($_POST['description'])) ? NULL : $_POST['description'];

        $sql = "SELECT * FROM UserAccount WHERE account_id = '$salesperson_code'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
          $sql = "INSERT INTO Salesperson
                      (
                          lname, fname, salesperson_code, gender, phone, department_id, email, description
                      ) VALUES (
                          '$lname', '$fname', '$salesperson_code', '$gender', '$phone',
                          (SELECT department_id FROM Department WHERE department_name = '$department'),
                          '$email', '$description'
                      )";
          $conn->query($sql);
        } else {
          return "Resister First";
        }
    }

    function deleteSalesperson() {
        global $conn;
        $salesperson_id = $_POST['salesperson_id'];
        $sql = "UPDATE Salesperson SET active_status = 'N' WHERE salesperson_id = $salesperson_id";
        $conn->query($sql);
    }
}


$salesperson = new Salesperson();
if ($_GET['action'] == 'getSalespersonList') {
    $result = $salesperson->getSalespersonList();
} else if ($_GET['action'] == 'getSalespersonInfo') {
    $result = $salesperson->getSalespersonInfo();
} else if ($_POST['action'] == 'updateSalesperson') {
    $result = $salesperson->updateSalesperson();
} else if ($_POST['action'] == 'insertSalesperson') {
    $result = $salesperson->insertSalesperson();
} else if ($_POST['action'] == 'deleteSalesperson') {
    $result = $salesperson->deleteSalesperson();
}

echo $result;


mysqli_close($conn);
?>
