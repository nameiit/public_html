<?php
 include('../../dbConnection.php');

 $transaction_id = $_POST['transaction_id'];
 $wholesaler = empty($_POST['wholesaler']) ? '' : $_POST['wholesaler'];
 $invoice = empty($_POST['invoice']) ? '' : $_POST['invoice'];
 $extra_in = empty($_POST['extra_in']) ? 0 : $_POST['extra_in'];
 $extra_in_currency = $_POST['extra_in_currency'];
 $extra_out = empty($_POST['extra_out']) ? 0 : $_POST['extra_out'];
 $extra_out_currency = $_POST['extra_out_currency'];
 $sup_exchange_rate = empty($_POST['sup_exchange_rate']) ? '%' : $_POST['sup_exchange_rate'];

 $extra_in_USD = $extra_in;
 $extra_out_USD = $extra_out;
 if ($extra_in_currency == 'RMB') {
     $extra_in_USD = $extra_in / $sup_exchange_rate;
 }
 if ($extra_out_currency == 'RMB') {
     $extra_out_USD = $extra_out / $sup_exchange_rate;
 }

$sql = "INSERT INTO ExtraSupplement(
         transaction_id,
         extra_in,
         extra_out,
         extra_in_currency,
         extra_out_currency,
         extra_in_usd_pending,
         extra_out_usd_pending)
     VALUES (
         '$transaction_id',
         '$extra_in',
         '$extra_out',
         '$extra_in_currency',
         '$extra_out_currency',
         '$extra_in_USD',
         '$extra_out_USD'
     )";
$conn->query($sql);

$sql = "INSERT INTO FinanceStatus (
            transaction_id,
            invoice,
            lock_status,
            clear_status,
            paid_status,
            finish_status,
            debt,
            received,
            selling_price,
            create_time,
            total_profit,
            ending,
            debt_cleared,
            received_finished,
            debt_raw,
            received_raw,
            wholesaler_code
        ) VALUES (
            $transaction_id,
            '$invoice',
            'N', 'N', 'N','N',
            $extra_out_USD, $extra_in_USD, 0,
            current_timestamp,
            $extra_in_USD - $extra_out_USD,
            'sup', 0, 0, $extra_out_USD, $extra_out_USD, '$wholesaler'
        ) ";
// echo $sql;
$conn->query($sql);

// if exchange_rate_sup 有数据
if ($sup_exchange_rate != '%') {
    $sql = "UPDATE ExtraSupplement SET exchange_rate = '$sup_exchange_rate'
            WHERE transaction_id = '$transaction_id'
            AND extra_in = '$extra_in'
            AND extra_out = '$extra_out'";
    $conn->query($sql);
}

 mysqli_close($conn);
?>
