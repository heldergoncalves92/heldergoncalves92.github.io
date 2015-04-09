<?php

	$to = 'heldergoncalves92@live.com.pt';
	$subject = 'Pagina Pessoal';
	$user = $_POST['name'];
	$mail = $_POST['mail'];
	$message = $_POST['message'];

	$emailRegex = "/^[a-z0-9\.\_\+\-]+\@([a-z]+\.)+[a-z]{2,4}$/";
	$userRegex = "/^[A-Za-zÀ-ú ]{3,}$/";
	$messageRegex = "/^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\n]{6,}$/";

	if(preg_match($userRegex, $user) && preg_match($emailRegex, $mail) && preg_match($messageRegex, $message)){
		$message = 'Nome: ' . $user . '
Mail: ' . $mail .'
Mensagem: '. $message;

		if(mail($to, $subject, $message, NULL))
		echo 'SENT';
	}

?>