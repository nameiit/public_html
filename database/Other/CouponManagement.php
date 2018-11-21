<?php
include('../dbConnection.php');

class CouponManagement {
    function getCouponList() {
        global $conn;

        $offset = $_GET['offset'];
        $code = empty($_GET['code']) ? '%' : $_GET['code'];
        $value = empty($_GET['value']) ? '%' : $_GET['value'];
        $status = empty($_GET['status']) ? '%' : $_GET['status'];

        $sql = "SELECT
                    c.code, c.discount, s.salesperson_code, c.description, c.code_expired
                FROM CouponCode c
                JOIN Salesperson s
                ON
                    c.salesperson_id = s.salesperson_id
                WHERE
                    c.code_expired LIKE '$status'
                AND
                    c.code LIKE '$code'
                AND
                    (c.discount LIKE '$value' OR c.discount = '$value')
                ORDER BY cc_id DESC
                LIMIT $offset";
        $result = $conn->query($sql);
        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }
        return json_encode($rows);
    }

    function addCoupon() {
        global $conn;

        $code = $_POST['code'];
        $value = $_POST['value'];
        $salesperson = empty($_POST['salesperson']) ? NULL : $_POST['salesperson'];
        $description = empty($_POST['description']) ? NULL : $_POST['description'];

        $sql = "INSERT INTO CouponCode
                    (code, discount, salesperson_id, description, code_expired)
                VALUES
                    ('$code', '$value', (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$salesperson'), '$description', 'N')";
        $conn->query($sql);
    }

    function disabledCoupon() {
        global $conn;

        $code = $_POST['code'];
        $sql = "UPDATE CouponCode SET code_expired = 'Y' WHERE code = '$code'";
        $conn->query($sql);
    }
}


$couponManagement = new CouponManagement();
if ($_GET['action'] == 'getCouponList') {
    $result = $couponManagement->getCouponList();
} else if ($_POST['action'] == 'addCoupon') {
    $couponManagement->addCoupon();
} else if ($_POST['action'] == 'disabledCoupon') {
    $couponManagement->disabledCoupon();
}

echo $result;

mysqli_close($conn);
?>
