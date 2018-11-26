<?php
// Database configuration in localhost

// $servername = "tamdb.cq9vfoupbdtx.us-east-1.rds.amazonaws.com";
// $servername = "namei-manhattan.clch6flcqmtk.us-west-2.rds.amazonaws.com";
// $username = "root";
// $password = "Namei520";
// $dbname = "nmu";
// $dbport = "3306";


$servername = "localhost";
$username = "tamglobalroot";
$password = "Namei520";
$dbname = "tamglobaldb";
$dbport = "3306";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname, $dbport);
mysqli_set_charset($conn, "utf8");
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
 ?>
