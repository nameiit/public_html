<?php
include('../dbConnection.php');

class TravelAgency {
    function getTravelAgencyList() {
        global $conn;
        $travel_agency_name = ($_GET['travel_agency_name'] == 'all') ? '%' : $_GET['travel_agency_name'];
        $status = ($_GET['status'] == 'all') ? '%' : $_GET['status'];
        $limit = (empty($_GET['limit'])) ? 0 : $_GET['limit'];

        $sql = "SELECT
                    ta_id, agency_name, email, phone, create_time,
                    concat(address, ' ', zipcode, ' ', country) as 'agency_address',
                    active_status, description
                FROM TravelAgency
                WHERE agency_name LIKE '$travel_agency_name'
                AND active_status LIKE '$status'
                ORDER BY ta_id DESC
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

    function getTravelAgencyInfo() {
        global $conn;
        $ta_id = $_GET['ta_id'];

        $sql = "SELECT
                    agency_name, email, phone, create_time,
                    address, zipcode, country,description
                FROM TravelAgency
                WHERE ta_id = $ta_id";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function updateTravelAgency() {
        global $conn;
        $agency_name = $_POST['agency_name'];
        $email = empty($_POST['email'])? NULL : $_POST['email'];
        $phone = empty($_POST['phone'])? NULL : $_POST['phone'];
        $create_time = $_POST['create_time'];
        $address = empty($_POST['address'])? NULL : $_POST['address'];
        $zipcode = empty($_POST['zipcode'])? NULL : $_POST['zipcode'];
        $region = empty($_POST['region'])? NULL : $_POST['region'];
        $description = empty($_POST['description'])? NULL : $_POST['description'];

        $ta_id = $_POST['ta_id'];

        $sql = "UPDATE TravelAgency SET
                    agency_name = '$agency_name',
                    create_time = '$create_time'";
                if ($description != NULL) {
                    $sql .= ", description = '$description'";
                }
                if ($email != NULL) {
                    $sql .= ", email = '$email'";
                }
                if ($phone != NULL) {
                    $sql .= ", phone = '$phone'";
                }
                if ($address != NULL) {
                    $sql .= ", address = '$address'";
                }
                if ($zipcode != NULL) {
                    $sql .= ", zipcode = '$zipcode'";
                }
                if ($region != NULL) {
                    $sql .= ", country = '$region'";
                }
                $sql .= " WHERE ta_id = $ta_id";
        $conn->query($sql);
    }

    function insertTravelAgency() {
        global $conn;

        $agency_name = $_POST['agency_name'];
        $email = (empty($_POST['email']))? NULL : $_POST['email'];
        $phone = (empty($_POST['phone']))? NULL : $_POST['phone'];
        $create_time = empty($_POST['create_time'])? CURRENT_TIMESTAMP : $_POST['create_time'];
        $address = empty($_POST['address'])? NULL : $_POST['address'];
        $zipcode = empty($_POST['zipcode'])? NULL : $_POST['zipcode'];
        $region = empty($_POST['region'])? NULL : $_POST['region'];
        $description = empty($_POST['description'])? NULL : $_POST['description'];

        $sql = "INSERT INTO TravelAgency";
        $sql .= " (agency_name, create_time";
        if ($description != NULL) {
            $sql .= ", description";
        }
        if ($email != NULL) {
            $sql .= ", email";
        }
        if ($phone != NULL) {
            $sql .= ", phone";
        }
        if ($address != NULL) {
            $sql .= ", address";
        }
        if ($zipcode != NULL) {
            $sql .= ", zipcode";
        }
        if ($region != NULL) {
            $sql .= ", country";
        }
        $sql .= ", active_status) VALUES ('$agency_name', '$create_time'";
        if ($description != NULL) {
            $sql .= ", '$description'";
        }
        if ($email != NULL) {
            $sql .= ", '$email'";
        }
        if ($phone != NULL) {
            $sql .= ", '$phone'";
        }
        if ($address != NULL) {
            $sql .= ", '$address'";
        }
        if ($zipcode != NULL) {
            $sql .= ", '$zipcode'";
        }
        if ($region != NULL) {
            $sql .= ", '$region'";
        }
        $sql .= ", 'Y')";
        $conn->query($sql);
    }

    function deleteTravelAgency() {
        global $conn;
        $ta_id = $_POST['ta_id'];
        $sql = "UPDATE TravelAgency SET active_status = 'N' WHERE ta_id = $ta_id";
        $conn->query($sql);
    }
}


$travelAgency = new TravelAgency();
if ($_GET['action'] == 'getTravelAgencyList') {
    $result = $travelAgency->getTravelAgencyList();
}
else if ($_GET['action'] == 'getTravelAgencyInfo') {
    $result = $travelAgency->getTravelAgencyInfo();
}
else if ($_POST['action'] == 'updateTravelAgency') {
    $result = $travelAgency->updateTravelAgency();
}
else if ($_POST['action'] == 'insertTravelAgency') {
    $result = $travelAgency->insertTravelAgency();
}
else if ($_POST['action'] == 'deleteTravelAgency') {
    $result = $travelAgency->deleteTravelAgency();
}

echo $result;


mysqli_close($conn);
?>
