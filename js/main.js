
	var userCheck=0;
	var mailCheck=0;
	var messageCheck=0;

	var home_height;
	var width, height;

	var aboutOffset, portfolioOffset, contactsOffset, selletedOpt=0, sellected_Obj, mobileCheck;

    window.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }
    mobileCheck = window.mobileAndTabletcheck();
	$('.noScript').removeClass('noScript');


	$(document).ready(function() {
		
		windowAdapt();

		//Fade In HOME
		$('#home').delay().animate({ opacity: 1, top: "0px" }, 1400);
		
		$(window).resize(function(){
			windowAdapt();
		});

		$(window).scroll(function(){
			$('#lastBox').css('top', $('#skills').offset().top -100 );
			$('#skillsWarning').css('top', $('#portfolio').offset().top-30);
			
			/***** NAVBAR *****/
			if(width>767){
				if(($('html').scrollTop()>home_height-100 || $('body').scrollTop()>home_height-100) ){
					$('#nav-main').fadeIn(400);
				}
				else
					$('#nav-main').fadeOut(400);

				//windowTOP=0;
				htmll = $('html').scrollTop();
				bodyy = $('body').scrollTop();

				if(htmll == 0)
					windowTOP = bodyy;
				else	
					windowTOP = htmll;
				
				//Icon Selected
				if( selletedOpt!=0 && windowTOP<aboutOffset){
					$('#btnHome').children('a').animate({borderBottomWidth:'6px',paddingBottom:'13px'},150);
					switch(selletedOpt){
						case 1: $('#btnAbout').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 2: $('#btnPortfolio').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 3: $('#btnContact').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
					}
					selletedOpt=0;
                    sellected_Obj = $('#btnHome').attr('id');
				
				} else if( selletedOpt!=1 && windowTOP>=aboutOffset && windowTOP<portfolioOffset){
					$('#btnAbout').children('a').animate({borderBottomWidth:'6px',paddingBottom:'13px'},150);
					switch(selletedOpt){
						case 0: $('#btnHome').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 2: $('#btnPortfolio').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 3: $('#btnContact').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
					}
					selletedOpt=1;
                    sellected_Obj = $('#btnAbout').attr('id');
				
				} else if( selletedOpt!=2 && windowTOP>=portfolioOffset && windowTOP<contactsOffset){
					$('#btnPortfolio').children('a').animate({borderBottomWidth:'6px',paddingBottom:'13px'},150);
					switch(selletedOpt){
						case 0: $('#btnHome').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 1: $('#btnAbout').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 3: $('#btnContact').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
					}
					selletedOpt=2;
                    sellected_Obj = $('#btnPortfolio').attr('id');
				
				} else if( selletedOpt!=3 && windowTOP>=contactsOffset){
					$('#btnContact').children('a').animate({borderBottomWidth:'6px',paddingBottom:'13px'},150);
					switch(selletedOpt){
						case 0: $('#btnHome').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 1: $('#btnAbout').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
						case 2: $('#btnPortfolio').children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200); break;
					}
					selletedOpt=3;
                    sellected_Obj = $('#btnContact').attr('id');
				}

			}else
				$('#nav-main').css('display','visible');
    	});

		$('#nav-main li').mouseenter(function(){
			if(width>767)
		  		$(this).children('a').animate({borderBottomWidth:'6px',paddingBottom:'13px'},150);
		});
        
		$('#nav-main li').mouseleave(function(){
		  	if(width>767 && $(this).attr('id') != sellected_Obj)
		  		$(this).children('a').delay(100).animate({borderBottomWidth:'0',paddingBottom:'0'},200);
		});

		

/*******************  Mail Control  ********************/

		var emailRegex = /^[a-z0-9\.\_\+\-]+\@([a-z]+\.)+[a-z]{2,4}$/;
		var userRegex = /^[A-Za-zÀ-ú ]{3,}$/;
		var messageRegex = /^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\£\n]{6,1000}$/;
		var specialRegex = /^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\£\n]{0,}$/;

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
			
            if(value.length >= 6){
                if(value.length > 1000){
                    messageCheck=0;
                    $('#msg-alert').html('Message limited to <strong>1000</strong> characters!');
                    $('#msg-alert').css('visibility','visible');

                }else{
                    if(!(value.match(specialRegex))){
                        $('#msg-alert').html('Special characters are <strong>not allowed</strong>!');
                        $('#msg-alert').css('visibility','visible');
                        messageCheck=0;
                    }else{
                        messageCheck=1;
                        $('#msg-alert').css('visibility','hidden');
                    }
                }
            }else messageCheck=0;
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
			$(this).attr('src','img/icon/twitter.jpg');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/twitter_gray.jpg');
		});

		$('#github')
		.mouseenter(function(){
			$(this).attr('src','img/icon/github.jpg');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/github_gray.jpg');
		});

		$('#linkedin')
		.mouseenter(function(){
			$(this).attr('src','img/icon/linkedin.png');
		})
		.mouseleave(function(){
			$(this).attr('src','img/icon/linkedin_gray.png');
		});
	});

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
	  			$('#btn-mailito').slideUp("slow");
	  			$('#form-message').slideUp("slow");
				$('#message').css('height','27em');
				$('#message-sent').css('visibility','visible');
			}
			else{
				$('#msg-alert').html('Your message was <strong>not sent</strong> successfully. <strong>Try again!');
				$('#msg-alert').css('visibility','visible');
			}
	  	});

	  	//Fail case
	  	$('#btn_send').removeAttr('disabled');
	}


	function scrollToElem(elem){

		let diff = elem.id === "professional" || elem.id === "education" ? -170 : -30;
		if($('.navbar-collapse').attr('aria-expanded') == 'true')	$('.navbar-collapse').collapse('hide');
		$('html,body').animate({scrollTop: $(elem).offset().top + diff}, 1000); 
	}


	function refreshOffsets(callback){
		aboutOffset 	= $('#about').offset().top-80;
		portfolioOffset = $('#portfolio').offset().top-80;
		contactsOffset  = $('#contact').offset().top-80;

		//Execute callback if it exists
		callback && callback();
	}

	$('#modal-sportgest').on('hidden.bs.modal', function () {
  		$('#sportgest_video').html("<iframe class='modal-iframe' src='https://www.youtube.com/embed/YBRLPbq3VFM' frameborder='0' allowfullscreen></iframe>");
	})
    
    $('#modal-DBLP').on('show.bs.modal', function () {
        if(!mobileCheck) {
            $('#DBLP-architecture').html("<iframe class='modal-iframe_doc' src='./ARQ_PROJ_C.pdf'></iframe>");
            $('#DBLP-architecture').addClass('center');
        }
	})

	function windowAdapt() {
		refreshOffsets(null);
		height = $(window).height();
		width = $(window).width();
		var factor = width/height;
		
		let parallaxHeight = height/2;
		if(parallaxHeight < 300) parallaxHeight = 300; 
		$('.parallax-window').css('height', parallaxHeight);

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
		
		
		/***********  Box Title ************/
		$('.boxTitle').css('left',width*0.5-100);
		$('#lastBox').css('top', $('#skills').offset().top -100 );


		
		/*********  about  *********/
		/*if(width<992)
			$('#about').css('height','none');
		else
			if(factor < 2)
				$('#about').css('height',height);


		/*********  SKILLS  *********/
		if(width<768)
			$('#skills').parent().css('height',1150);
		else 
			if(width > 992) $('#skills').parent().css('height',360);
		else
			$('#skills').parent().css('height',560);
			
		refreshOffsets(null);
	}