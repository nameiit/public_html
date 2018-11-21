<?php
include('../dbConnection.php');

class Wholesaler {
    function getWholesalerList() {
        global $conn;
        $wholesaler_code = ($_GET['wholesaler_code'] == 'all') ? '%' : $_GET['wholesaler_code'];
        $wholesaler_name = ($_GET['wholesaler_name'] == 'all') ? '%' : $_GET['wholesaler_name'];
        $contact_person = ($_GET['contact_person'] == 'all') ? '%' : $_GET['contact_person'];
        $region = ($_GET['region'] == 'all') ? '%' : $_GET['region'];
        $business_type = ($_GET['business_type'] == 'all') ? '%' : $_GET['business_type'];
        $limit = (empty($_GET['limit'])) ? 0 : $_GET['limit'];

        $sql = "SELECT wholesaler_id, wholesaler_code, name, email, contact_person, region, business_type, description
                FROM Wholesaler
                WHERE name LIKE '$wholesaler_name'
                AND region LIKE '$region'
                AND business_type LIKE '$business_type'
                AND wholesaler_code LIKE '$wholesaler_code'
                AND contact_person LIKE '$contact_person'
                ORDER BY wholesaler_id DESC
                LIMIT $limit";
        $result = $conn->query($sql);
        $rows = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }
        return json_encode($rows);
    }

    function getWholesalerInfo() {
        global $conn;
        $wholesaler_id = $_GET['wholesaler_id'];

        $sql = "SELECT wholesaler_code, name, email, contact_person, region, contact_person_phone, business_type, description
                FROM wholesaler
                WHERE wholesaler_id = '$wholesaler_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function updateWholesaler() {
        global $conn;
        $wholesaler_code = $_POST['wholesaler_code'];
        $wholesaler_name = $_POST['wholesaler_name'];
        $wholesaler_email = $_POST['wholesaler_email'];
        $contact_person = $_POST['contact_person'];
        $resion = $_POST['region'];
        $contact_person_phone = $_POST['contact_person_phone'];
        $business_type = $_POST['business_type'];
        $description = (empty($_POST['description']))? NULL : $_POST['description'];
        $wholesaler_id = $_POST['wholesaler_id'];

        $sql = "UPDATE wholesaler
                SET
                    wholesaler_code = '$wholesaler_code',
                    name = '$wholesaler_name',
                    email = '$wholesaler_email',
                    contact_person = '$contact_person',
                    region = '$resion',
                    contact_person_phone = '$contact_person_phone',
                    business_type = '$business_type',
                    description = '$description'
                WHERE wholesaler_id = $wholesaler_id";
        $conn->query($sql);
    }

    function insertWholesaler() {
        global $conn;
        $wholesaler_code = (empty($_POST['wholesaler_code'])) ? NULL : $_POST['wholesaler_code'];
        $wholesaler_name = $_POST['wholesaler_name'];
        $wholesaler_phone = $_POST['wholesaler_phone'];
        $wholesaler_email = (empty($_POST['wholesaler_email'])) ? NULL : $_POST['wholesaler_email'];
        $contact_person = (empty($_POST['contact_person'])) ? NULL : $_POST['contact_person'];
        $resion = (empty($_POST['region'])) ? NULL : $_POST['region'];
        $contact_person_phone = (empty($_POST['contact_person_phone'])) ? NULL : $_POST['contact_person_phone'];
        $business_type = (empty($_POST['business_type'])) ? NULL : $_POST['business_type'];
        $description = (empty($_POST['description'])) ? NULL : $_POST['description'];

        $sql = "INSERT INTO Wholesaler
                    (
                        wholesaler_code, name, email, phone, contact_person, region, contact_person_phone, business_type, description
                    ) VALUES (
                        '$wholesaler_code', '$wholesaler_name', '$wholesaler_email', '$wholesaler_phone', '$contact_person', '$resion', '$contact_person_phone', '$business_type','$description'
                    )";
        $conn->query($sql);
    }

    function deleteWholesaler() {
        global $conn;
        $wholesaler_id = $_POST['wholesaler_id'];
        $sql = "DELETE FROM Wholesaler WHERE wholesaler_id = $wholesaler_id";
        $conn->query($sql);
    }
}


$wholesaler = new Wholesaler();
if ($_GET['action'] == 'getWholesalerList') {
    $result = $wholesaler->getWholesalerList();
} else if ($_GET['action'] == 'getWholesalerInfo') {
    $result = $wholesaler->getWholesalerInfo();
} else if ($_POST['action'] == 'updateWholesaler') {
    $result = $wholesaler->updateWholesaler();
} else if ($_POST['action'] == 'insertWholesaler') {
    $result = $wholesaler->insertWholesaler();
} else if ($_POST['action'] == 'deleteWholesaler') {
    $result = $wholesaler->deleteWholesaler();
}

echo $result;


mysqli_close($conn);
?>
