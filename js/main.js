
	var userCheck=0;
	var mailCheck=0;
	var messageCheck=0;

	var home_height;
	var width, height;

	/*******************  Mail Control  ********************/

	var emailRegex = /^[a-z0-9\.\_\+\-]+\@([a-z]+\.)+[a-z]{2,4}$/;
	var userRegex = /^[A-Za-zÀ-ú ]{3,}$/;
	var messageRegex = /^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\n]{6,}$/;

	function testSend(){
		if(userCheck==1 && mailCheck==1 && messageCheck==1)
			$('#btn_send').removeAttr('disabled');
		else
			$('#btn_send').attr('disabled','');
	}

	function sentMessage(){
		$('#btn_send').attr('disabled','');

		$.post("http://heldergoncalves.esy.es/sendMail.php",
	  	{	
	    	name:$('#inputUser').val(),
	    	mail:$('#inputMail').val(),
	    	message:$('#inputMessage').val()
	  	},
	  	function(data,status){
	  		if(data == 'SENT'){
	  			$('#form-message').slideUp("slow");
				$('#message').css('height','27em');
				$('#message-sent').css('visibility','visible');
			}
			else{
				$('#msg-alert').css('visibility','visible');
			}
	  	});

	  	//Fail case
	  	$('#btn_send').removeAttr('disabled');
	}

	$(document).ready(function() {
		
		windowAdapt();
		$(window).resize(function(){
			windowAdapt();

		});

		$(window).scroll(function(){
			if(width>768)
				if(($('html').scrollTop()>home_height-100 || $('body').scrollTop()>home_height-100) ){
					$('#nav-main').fadeIn(400);
				}
				else
					$('#nav-main').fadeOut(400);
			else
				$('#nav-main').css('display','visible');
		});

		$('#nav-main li').mouseenter(function(){
			if(width>768)
		  		$(this).children('a').animate({borderBottomWidth:'6px',paddingBottom:'10px'},100);
		});
		$('#nav-main li').mouseleave(function(){
		  	if(width>768)
		  		$(this).children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200);
		});


		
		$('#inputUser').keyup(function(){
			var value = $(this).val().replace(/( ){3,}/, ' ');
			$(this).val(value);

			if(value == ''){
				$('#fUser').removeClass('has-error');
			}
			else{
				if(value.match(userRegex)){
					$('#fUser').removeClass('has-error');
					$('#fUser').addClass('has-success');
					userCheck=1;
				}
				else{
					$('#fUser').removeClass('has-success');
					$('#fUser').addClass('has-error');
					userCheck=0;
				}
				testSend();
			}
		});

		$('#inputMail').keyup(function(){
			var value = $(this).val();
			if(value == ''){
				$('#fMail').removeClass('has-error');
			}
			else{
				if(value.match(emailRegex)){
					$('#fMail').removeClass('has-error');
					$('#fMail').addClass('has-success');
					mailCheck=1;
				}
				else{
					$('#fMail').removeClass('has-success');
					$('#fMail').addClass('has-error');
					mailCheck=0;
				}
				testSend();

			}
		});

		$('#inputMessage').keyup(function(){
			var value = $(this).val().replace(/( ){3,}/, ' ');
			$(this).val(value);
			
			if(value.match(messageRegex))
				messageCheck=1;
			else
				messageCheck=0;
			testSend();
		});

		


		

	/************* ICON's **************/
		$('#facebook')
		.mouseenter(function(){
			$(this).attr('src','img/icon/facebook.png');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/facebook_gray.png');
		});

		$('#twitter')
		.mouseenter(function(){
			$(this).attr('src','img/icon/twitter.png');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/twitter_gray.png');
		});

		$('#github')
		.mouseenter(function(){
			$(this).attr('src','img/icon/github.png');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/github_gray.png');
		});

		$('#linkedin')
		.mouseenter(function(){
			$(this).attr('src','img/icon/linkedin.png');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/linkedin_gray.png');
		});
	});




	function scrollToElem(elem){
		if($('.navbar-collapse').attr('aria-expanded') == 'true')	$('.navbar-collapse').collapse('hide');
		$('html,body').animate({scrollTop: $(elem).offset().top -30}, 1000); 
	}

	function windowAdapt() {
		height = $(window).height();
		width = $(window).width();
		var factor = width/height;

		$('.parallax-window').css('height',height);
		

		/*********  Home  *********/
		if(width<992){
			//Tamanho da janela HOME
			$('.home-hmin').css('height','none');

			home_height = $('#home').height()+100;
			$('.smooth').css('height',home_height);
			$('.smooth2').css('height',home_height);
		}else{
			home_height = $('#home').height()
			$('.home-hmin').css('height',height);
		}
		
		
		

		/*********  about  *********/
		/*if(width<992)
			$('#about').css('height','none');
		else
			if(factor < 2)
				$('#about').css('height',height);


		/*********  SKILLS  *********/
		if(width<768)
			$('#skills').parent().css('height',1170);
		else 
			if(width > 992) $('#skills').parent().css('height',360);
		else
				$('#skills').parent().css('height',560);
			

	}
















	


