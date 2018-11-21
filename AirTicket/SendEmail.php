<?php
/**
 * Created by PhpStorm.
 * User: zoey
 * Date: 7/27/18
 * Time: 10:52 AM
 */

require '/usr/share/php/libphp-phpmailer/class.phpmailer.php';
require  '/usr/share/php/libphp-phpmailer/class.smtp.php';

date_default_timezone_get('PRC');
$mail = new PHPMailer();

$mail->SMTPDebug = 0;
$mail->isSMTP();
$mail->isHTML(true);
$mail->SMTPAuth=true;
$mail->Host = 'smtp.exmail.qq.com';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->Hostname = 'localhost';
$mail->CharSet = 'UTF-8';
$mail->FromName = 'NameiGruoup';
$mail->Username ='invoice@aotrip.net';
$mail->Password = 'Zhongguo235';

$filename = "../invoice_body.html";
$handle = fopen($filename,"r");
$contents = fread($handle, filesize($filename));
fclose($handle);
$receiver = $_POST['receiver'];
$address = explode(";",$receiver);
foreach($address as $value){
    $mail -> addAddress($value,'Guest');
}
$mail->From = 'invoice@aotrip.net';
$mail->Subject = '机票确认单';

$full_name = $_POST['bill_name'];
$showtime=date("Y-m-d");
$itinerary = $_POST['itinerary'];
$price=$_POST['price'];
$transactionId=$_POST['transactionId'];
$method = " " . $_POST['method'];

$index_date = strripos($contents, "id=\"date\"");
$contents = substr_replace($contents, $showtime, $index_date+10,0);

$index_transactionId = strripos($contents, "id=\"transactionId\"");
$contents = substr_replace($contents, $transactionId, $index_transactionId+19,0);

$index_name = strripos($contents, "id=\"full_name\"");
$contents = substr_replace($contents, $full_name, $index_name+15,0);

$index_description = strripos($contents, "id=\"description\"");
for ($i=count($itinerary)-1; $i>=0; $i = $i-1){
    $contents = substr_replace($contents, $itinerary[$i] .'<br>', $index_description+17,0);
}

$index_rate = strripos($contents, "id=\"rate\"");
$contents = substr_replace($contents, $price, $index_rate+10,0);

$index_amount = strripos($contents, "id=\"amount\"");
$contents = substr_replace($contents, $price, $index_amount+12,0);

$index_overall = strripos($contents, "id=\"overall\"");
$contents = substr_replace($contents, $price, $index_overall+24,0);
$index_method = strripos($contents, "id=\"method\"");
$contents = substr_replace($contents, $method, $index_method+26,0);

file_put_contents('attachment.html', $contents);

$html_file_url = 'attachment.html'; // html file
$pdf_file_url = 'attachment.pdf'; // pdf file

$cmd = "/usr/local/bin/wkhtmltox/bin/wkhtmltopdf $html_file_url $pdf_file_url";// command
exec($cmd);

$mail->AddAttachment('attachment.pdf','机票确认单.pdf');
$mail->Body = "机票确认单详情请查看PDF附件<br>Please check the attachment for your reference";
$status = $mail->send();
$cmd = "rm -f attachment.html";
exec($cmd);
$cmd = "rm -f attachment.pdf";
exec($cmd);

if($status)
{
    echo 1;
}
else
{
     echo 0;
}
