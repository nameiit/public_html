<?php
include('../dbConnection.php');

class QuestionBoard {
    function getQuestions($login_username) {
        global $conn;

        $sql = "SELECT
                    question_id, question_title, question_time,
                    (SELECT salesperson_code FROM Salesperson WHERE salesperson_id = ask_salesperson_id) AS 'salesperson_code',
                    answer_content, question_status, question_content,
                    (SELECT agency_name FROM TravelAgency WHERE ta_id = qb.ta_id) AS 'agency_name'
                FROM QuestionBoard qb";

        if (!empty($_GET['agency_name'])) {
            $sql .= " WHERE ta_id = (SELECT ta_id FROM TravelAgency WHERE agency_name = '" . $_GET['agency_name']. "')";
        }
        $sql .= " ORDER BY question_id DESC LIMIT 20";
        $result = $conn->query($sql);

        $res = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $res[] = $row;
            }
        }

        return json_encode($res);
    }

    function answerQuestion () {
        global $conn;

        $question_id = $_POST['questionId'];
        $answerContent = $_POST['answerContent'];

        $sql = "UPDATE
                    QuestionBoard
                SET
                    answer_content = '$answerContent',
                    question_status = 'solved'
                    WHERE question_id = $question_id";
        $conn->query($sql);
    }

    function createQuestion($login_username) {
        global $conn;

        $title = $_POST['title'];
        $content = $_POST['content'];

        if ($login_username == '%') {
          $sql = "SELECT ta_id FROM TravelAgency WHERE agency_name = 'Namei'";
          $result = $conn->query($sql);
          $ta_id = $result->fetch_assoc()['ta_id'];
        } else {
          $sql = "SELECT ta_id FROM Salesperson WHERE salesperson_code = '$login_username'";
          $result = $conn->query($sql);
          $ta_id = $result->fetch_assoc()['ta_id'];
        }

        if ($ta_id != NULL) {
          $sql = "INSERT INTO QuestionBoard(
                      question_title,
                      question_time,
                      ta_id,
                      question_content
                  ) VALUES(
                      '$title',
                      current_timestamp,
                      '$ta_id',
                      '$content'
                  )";
        } else {
          $sql = "INSERT INTO QuestionBoard(
                      question_title,
                      question_time,
                      ask_salesperson_id,
                      question_content,
                      ta_id
                  ) VALUES(
                      '$title',
                      current_timestamp,
                      (SELECT salesperson_id FROM Salesperson WHERE salesperson_code = '$login_username'),
                      '$content',
                      (SELECT ta_id FROM TravelAgency WHERE agency_name = 'Namei')
                  )";
        }
        // echo $sql;
        $conn->query($sql);
    }
}

session_start();
$login_username = $_SESSION["username"];
$group_name = $_SESSION["group_name"];

if ($group_name != 'normal') {
    $login_username = '%';
}
$questionBoard = new QuestionBoard();
if ($_GET['action'] == 'getQuestions') {
    $result = $questionBoard->getQuestions($login_username);
} else if ($_POST['action'] == 'answerQuestion') {
    $result = $questionBoard->answerQuestion();
} else if ($_POST['action'] == 'createQuestion') {
    $result = $questionBoard->createQuestion($login_username);
}

echo $result;

mysqli_close($conn);
?>
