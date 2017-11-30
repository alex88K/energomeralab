<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;

if( isset($_POST['as_url']) && $_POST['as_url'] == '' && isset($_POST['policy-ch']) ) {

	if ( $method === 'POST' ) {

		$project_name = trim($_POST["project_name"]);
		$admin_email  = trim($_POST["admin_email"]);
		$form_subject = trim($_POST["form_subject"]);

		$message .= '<tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Имя</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["name"] . '</td>
			</tr>
			<tr>
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Телефон</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["phone"] . '</td>
			</tr>
			<tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>E-mail</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["email"] . '</td>
			</tr>
		';

	} else if ( $method === 'GET' ) {

		$project_name = trim($_GET["project_name"]);
		$admin_email  = trim($_GET["admin_email"]);
		$form_subject = trim($_GET["form_subject"]);

		$message .= '<tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Имя</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["name"] . '</td>
			</tr>
			<tr>
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>Телефон</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["phone"] . '</td>
			</tr>
			<tr style="background-color: #f8f8f8;">
				<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>E-mail</b></td>
				<td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST["email"] . '</td>
			</tr>
		';
	}

	$message = "<h3>$form_subject</h3><br/><table style='width: 100%;'>$message</table>";

	function adopt($text) {
		return '=?UTF-8?B?'.Base64_encode($text).'?=';
	}

	$headers = "MIME-Version: 1.0" . PHP_EOL .
	"Content-Type: text/html; charset=utf-8" . PHP_EOL .
	'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
	'Reply-To: '.$admin_email.'' . PHP_EOL;

	mail($admin_email, adopt($form_subject), $message, $headers );

}