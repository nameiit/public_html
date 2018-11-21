<?php
include('../dbConnection.php');

class SalesPerformance {
    function getGeneralPerformance() {
        global $conn;

        $timeFilter = $_POST['time_filter'];
        $startDate = $_POST['start_date'];
        $endDate = $_POST['end_date'];
        $salesperson = empty($_POST['salesperson']) ? '%' : $_POST['salesperson'];

        $sql = "CALL sum_profit('$timeFilter', '$salesperson', '$startDate', '$endDate')";
        $result = $conn->query($sql);

        $res = array();
        $period = array();
        $group_sum = array();
        $indiv_sum = array();
        $airticket_sum = array();
        $total_sum = array();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $period[] = $row['time_period'];
                $group_sum[] = $row['groupSum'];
                $indiv_sum[] = $row['indivSum'];
                $airticket_sum[] = $row['airSum'];
                $total_sum[] = $row['totalSum'];
            }
        }

        array_push($res, $period);
        array_push($res, $group_sum);
        array_push($res, $indiv_sum);
        array_push($res, $airticket_sum);
        array_push($res, $total_sum);
        return json_encode($res);
    }

    function getSpecificPerformance() {
        global $conn;
        global $servername;
        global $username;
        global $password ;
        global $dbname;
        global $dbport;

        $timeFilter = $_POST['time_filter'];
        $startDate = $_POST['start_date'];
        $endDate = $_POST['end_date'];
        $salespersons = json_decode($_POST['salespersons']);

        $performanceInfo = [];
        for ($i = 0; $i < sizeof($salespersons); $i++) {
            mysqli_close($conn);
            $conn = mysqli_connect($servername, $username, $password, $dbname, $dbport);

            $res = array();
            $period = array();
            $group_sum = array();
            $indiv_sum = array();
            $airticket_sum = array();
            $total_sum = array();

            $sql = "CALL sum_profit('$timeFilter', '$salespersons[$i]', '$startDate', '$endDate')";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $period[] = $row['time_period'];
                    $group_sum[] = $row['groupSum'];
                    $indiv_sum[] = $row['indivSum'];
                    $airticket_sum[] = $row['airSum'];
                    $total_sum[] = $row['totalSum'];
                }
            }
            array_push($res, $period);
            array_push($res, $group_sum);
            array_push($res, $indiv_sum);
            array_push($res, $airticket_sum);
            array_push($res, $total_sum);
            array_push($performanceInfo, $res);

        }
        return json_encode($performanceInfo);
    }
}

$SalesPerformance = new SalesPerformance();
if ($_POST['action'] == 'getGeneralPerformance') {
    $result = $SalesPerformance->getGeneralPerformance();
} else if ($_POST['action'] == 'getSpecificPerformance') {
    $result = $SalesPerformance->getSpecificPerformance();
}
echo $result;

mysqli_close($conn);
?>
