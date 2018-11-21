<?php
include('../dbConnection.php');

class TouristGuide {
    function getTouristGuideList() {
        global $conn;
        $tourist_guide_name = ($_GET['tourist_guide_name'] == 'all') ? '%' : $_GET['tourist_guide_name'];
        $gender = ($_GET['gender'] == 'all') ? '%' : $_GET['gender'];
        $limit = (empty($_GET['limit'])) ? 0 : $_GET['limit'];

        $sql = "SELECT guide_id, concat(fname, ' ', lname) as name, gender, age, phone, email,
                       concat(other_contact_type, ': ', other_contact_number) as 'other_contact', descriptions
                FROM TouristGuide
                WHERE (concat(lname, fname) LIKE '$tourist_guide_name' OR concat(fname, ' ', lname) LIKE '$tourist_guide_name')
                AND gender LIKE '$gender'
                ORDER BY guide_id DESC
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

    function getTouristGuideInfo() {
        global $conn;
        $tourist_guide_id = $_GET['tourist_guide_id'];

        $sql = "SELECT fname, lname, gender, age, phone, email, other_contact_type, other_contact_number, descriptions
                FROM TouristGuide
                WHERE guide_id = $tourist_guide_id";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            return json_encode($result->fetch_assoc());
        }
    }

    function updateTouristGuide() {
        global $conn;
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $gender = $_POST['gender'];
        $age = (empty($_POST['age'])) ? NULL : $_POST['age'];
        $phone = $_POST['phone'];
        $email = (empty($_POST['email'])) ? NULL : $_POST['email'];
        $other_contact_type = (empty($_POST['other_contact_type'])) ? NULL : $_POST['other_contact_type'];
        $other_contact_number = (empty($_POST['other_contact_number'])) ? NULL : $_POST['other_contact_number'];
        $descriptions = (empty($_POST['descriptions']))? NULL : $_POST['descriptions'];
        $tourist_guide_id = $_POST['tourist_guide_id'];

        $sql = "UPDATE TouristGuide SET fname = '$fname', lname = '$lname', gender = '$gender'";
        if ($age != NULL) {
            $sql .= ", age = $age";
        }
        $sql .= ", phone = '$phone', email = '$email'";
        if ($other_contact_number != NULL) {
            $sql .= ", other_contact_type = '$other_contact_type', other_contact_number = '$other_contact_number'";
        }
        $sql .= ", descriptions = '$descriptions' WHERE guide_id = $tourist_guide_id";
        $conn->query($sql);
    }

    function insertTouristGuide() {
        global $conn;
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $gender = $_POST['gender'];
        $age = (empty($_POST['age'])) ? NULL : $_POST['age'];
        $phone = $_POST['phone'];
        $email = (empty($_POST['email'])) ? NULL : $_POST['email'];
        $other_contact_type = (empty($_POST['other_contact_type'])) ? NULL : $_POST['other_contact_type'];
        $other_contact_number = (empty($_POST['other_contact_number'])) ? NULL : $_POST['other_contact_number'];
        $descriptions = (empty($_POST['descriptions'])) ? NULL : $_POST['descriptions'];

        $sql = "INSERT INTO TouristGuide";
        $sql .= " (fname, lname, gender";
        if ($age != NULL) {
            $sql .= ", age";
        }
        $sql .= ", phone, email";
        if ($other_contact_number != NULL) {
            $sql .= ", other_contact_type, other_contact_number";
        }
        $sql .= ", descriptions) VALUES ('$fname', '$lname', '$gender'";
        if ($age != NULL) {
            $sql .= ", $age";
        }
        $sql .= ", '$phone', '$email'";
        if ($other_contact_number != NULL) {
            $sql .= ", '$other_contact_type', '$other_contact_number'";
        }
        $sql .= ", '$descriptions')";
        $conn->query($sql);
    }

    function deleteTouristGuide() {
        global $conn;
        $tourist_guide_id = $_POST['tourist_guide_id'];
        $sql = "DELETE FROM TouristGuide WHERE guide_id = $tourist_guide_id";
        $conn->query($sql);
    }
}


$touristGuide = new TouristGuide();
if ($_GET['action'] == 'getTouristGuideList') {
    $result = $touristGuide->getTouristGuideList();
} else if ($_GET['action'] == 'getTouristGuideInfo') {
    $result = $touristGuide->getTouristGuideInfo();
} else if ($_POST['action'] == 'updateTouristGuide') {
    $result = $touristGuide->updateTouristGuide();
} else if ($_POST['action'] == 'insertTouristGuide') {
    $result = $touristGuide->insertTouristGuide();
} else if ($_POST['action'] == 'deleteTouristGuide') {
    $result = $touristGuide->deleteTouristGuide();
}

echo $result;


mysqli_close($conn);
?>
