<?php

	function write_mail($message){

		$date = date('Y-m-d H:i:s');

		$file = fopen('NEW MESSAGE-' . $date  . '.txt',"w");
		
		fwrite($file, $message);
		

		fclose($file);
	}
	
	//$to = 'heldergoncalves92@gmail.com';
	//$subject = 'Pagina Pessoal';
	$user = $_POST['name'];
	$mail = $_POST['mail'];
	$message = $_POST['message'];

	$emailRegex = "/^[a-z0-9\.\_\+\-]+\@([a-z]+\.)+[a-z]{2,4}$/";
	$userRegex = "/^[A-Za-zÀ-ú ]{3,}$/";
	$messageRegex = "/^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\£\n]{6,1000}$/";

	if(preg_match($userRegex, $user) && preg_match($emailRegex, $mail) && preg_match($messageRegex, $message)){
		$message = 'Nome: ' . $user . '
Mail: ' . $mail .'
Mensagem: '. $message;

		//if(mail($to, $subject, $message, NULL))
		write_mail($message);
		echo 'SENT';
	}

?>