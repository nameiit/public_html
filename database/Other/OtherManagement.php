<?php
include ('../dbConnection.php');

class OtherManagement {
	function getDepartment() {
		global $conn;

		$sql = "SELECT department_name, description FROM department";
		$result = $conn -> query($sql);

		$rows = array();
		if ($result -> num_rows > 0) {
			while ($row = $result -> fetch_assoc()) {
				$rows[] = $row;
			}
		}
		return json_encode($rows);
	}

	function addDepartment() {
		global $conn;

		$department_name = $_POST['department_name'];
		$description = $_POST['description'];

		$sql = "INSERT INTO department (department_name, description) VALUES ('$department_name', '$description')";
		$conn -> query($sql);
	}

	function getMcoParty() {
		global $conn;

		$sql = "SELECT party_title FROM McoParty";
		$result = $conn -> query($sql);

		$rows = array();
		if ($result -> num_rows > 0) {
			while ($row = $result -> fetch_assoc()) {
				$rows[] = $row;
			}
		}
		return json_encode($rows);
	}

	function addMcoParty() {
		global $conn;

		$mco_party = $_POST['mcp_party'];

		$sql = "INSERT INTO McoParty (party_title) VALUES ('$mco_party')";
		$conn -> query($sql);
	}

	function deleteMcoParty() {
		global $conn;

		$mco_party_list = json_decode($_POST['mcp_party_list']);

		for ($i = 0; $i < sizeof($mco_party_list); $i++) {
			$sql = "DELETE FROM McoParty WHERE party_title = '$mco_party_list[$i]'";
			$conn -> query($sql);
		}
	}

	function getCustomerSource() {
		global $conn;

		$sql = "SELECT source_name FROM CustomerSource";
		$result = $conn -> query($sql);

		$rows = array();
		if ($result -> num_rows > 0) {
			while ($row = $result -> fetch_assoc()) {
				$rows[] = $row;
			}
		}
		return json_encode($rows);
	}

	function addCustomerSource() {
		global $conn;

		$source_name = $_POST['source_name'];

		$sql = "INSERT INTO CustomerSource (source_name) VALUE ('$source_name')";
		$conn -> query($sql);
	}

	function deleteCustomerSource() {
		global $conn;

		$source_list = json_decode($_POST['list']);
		$sql = "DELETE FROM CustomerSource WHERE source_name = '$source_list[0]'";
		for ($i = 1; $i < sizeof($source_list); $i++) {
			$sql .= " OR source_name = '$source_list[$i]'";
		}
		$conn -> query($sql);
	}

}

$otherManagement = new OtherManagement();
if ($_GET['action'] == 'getDepartment') {
	$result = $otherManagement -> getDepartment();
} else if ($_GET['action'] == 'getMcoParty') {
	$result = $otherManagement -> getMcoParty();
} else if ($_GET['action'] == 'getCustomerSource') {
	$result = $otherManagement -> getCustomerSource();
} else if ($_POST['action'] == 'addCustomerSource') {
	$result = $otherManagement -> addCustomerSource();
} else if ($_POST['action'] == 'deleteCustomerSource') {
	$result = $otherManagement -> deleteCustomerSource();
} else if ($_POST['action'] == 'addMcoParty') {
	$result = $otherManagement -> addMcoParty();
} else if ($_POST['action'] == 'addDepartment') {
	$result = $otherManagement -> addDepartment();
} else if ($_POST['action'] == 'deleteMcoParty') {
	$otherManagement -> deleteMcoParty();
}
echo $result;

mysqli_close($conn);
?>
