<?php
 include('../../dbConnection.php');

 $transaction_id_refund = $_POST['transaction_id'];
 $refundTtype = $_POST['ref_type'];
 $refundAmount = $_POST['ref_value'];
 $refundCurrency = $_POST['ref_currency'];
 $exchante_rate_ref = empty($_POST['ref_exchange_rate']) ? '%' : $_POST['ref_exchange_rate'];

 $refundAmountUSD = $refundAmount;
 if ($refundCurrency == 'RMB') {
     $refundAmountUSD = $refundAmountUSD / $exchange_rate_ref;
 }

 if ($refundTtype == 'okay_its_yours') {
     $sql = "INSERT INTO Refund (
                 transaction_id,
                 okay_its_yours_usd_pending,
                 okay_its_yours,
                 okay_its_yours_currency
             ) VALUES (
                 '$transaction_id_refund',
                 '$refundAmountUSD',
                 '$refundAmount',
                 '$refundCurrency'
             )";
     $conn->query($sql);
 } else {
     $sql = "INSERT INTO Refund (
             transaction_id,
             nice_gotit_usd_pending,
             nice_gotit,
             nice_gotit_currency
         ) VALUES (
             '$transaction_id_refund',
             '$refundAmountUSD',
             '$refundAmount',
             '$refundCurrency'
         )";
     $conn->query($sql);
 }

 // if exchange_rate_ref 有数据
 if ($exchante_rate_ref != '%') {
     $sql = "UPDATE Refund
             SET exchange_rate = '$exchange_rate_ref'
             WHERE transaction_id = '$transaction_id_refund'
             AND (okay_its_yours = $refundAmount OR nice_gotit = $refundAmount)";
     $conn->query($sql);
 }

 mysqli_close($conn);
?>
