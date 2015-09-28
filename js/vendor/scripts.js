window.onload = function(){

    function isMobileWidth() {
        return $('#mobile-indicator').is(':visible');
    }
    function isMiddleWidth() {
        return $('#medium-indicator').is(':visible');
    }
    function isMaxWidth() {
        return $('#max-indicator').is(':visible');
    }

    if ($('#page input').hasClass("phone-mask")) {
      $("#page .phone-mask").mask("+7 (999) 999-9999");
    };

    FastClick.attach(document.body);

    function stickyFooter() {
        $('.n-main').css('padding-bottom',$('.n-footer').outerHeight(true));
    }

    stickyFooter();
    $(window).on('resize',stickyFooter);

    $('input, textarea').placeholder();

    function placeholder() {

      $('input[type="text"],input[type="search"], textarea').focus(function(){
        if ($(this).prop('readonly')==false) {
           var plac = $(this).prop('placeholder');
           $(this).prop('placeholder',' ');

           $('input[type="text"],input[type="search"], textarea').blur(function(){
               $(this).prop('placeholder',plac);
           });
        }
      });

    };

    placeholder();

    function showMenu() {
        if (isMobileWidth()) {
            $('.n-nav').hide();
        } else {
            $('.n-nav').show();
        }
    }

    showMenu();

    function showLogs() {
        $('.n-main__col__catalog__logs__button').removeClass('n-main__col__catalog__logs__button--active');
        if(isMobileWidth()) {
            $('.n-main__col__catalog__logs').hide();
        }
        else {
            $('.n-main__col__catalog__logs').show();
        }
    }

    showLogs();

    $('.n-main__col__catalog__logs__button').click(function(){
        if ($('.n-main__col__catalog__logs').css('display')=='none') {
           $('.n-main__col__catalog__logs').show('fast');
           $('.n-main__col__catalog__logs__button').addClass('n-main__col__catalog__logs__button--active');
        } else {
           $('.n-main__col__catalog__logs').hide('fast');
           $('.n-main__col__catalog__logs__button').removeClass('n-main__col__catalog__logs__button--active');
        }
    });

    var popup = 0;

    $(function () {
        $('.n-header__icons--phone').magnificPopup({
            type: 'inline',

            fixedContentPos: false,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'

        });
        $(document).on('click', '.pop-up-phone__header__close', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
    });

    $(function () {
        $('.n-footer__write').magnificPopup({
            type: 'inline',

            fixedContentPos: false,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom',
            callbacks: {
                open: function() {
                    popup = $.magnificPopup.instance;
                }
            }
        });
    });

    $(function () {
        $('.n-header__icons--mes').magnificPopup({
            type: 'inline',

            fixedContentPos: false,
            fixedBgPos: true,

            overflowY: 'auto',

            closeBtnInside: true,
            preloader: false,

            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom',
            callbacks: {
                open: function() {
                    popup = $.magnificPopup.instance;
                }
            }
        });
    });

    $('.n-header__icons__menu').click(function(){
        $('.n-nav').toggle('fast');
        if ($(this).find('span').hasClass('n-header__icons__menu--active')) {
            $(this).find('span').removeClass('n-header__icons__menu--active');
        } else {
            $(this).find('span').addClass('n-header__icons__menu--active');
        }
    })

    if (('.n-main__slider-h__container').length) {

        var sliderH = new Swiper('.n-main__slider-h__container', {
            speed: 400,
            spaceBetween: 100,
            autoplay: 3000,
            effect: 'fade',
            fade: {
               crossFade: true
            },
            loop: true,
            autoplayDisableOnInteraction: false,
        });
    }

    $('.n-main__col__form').hover(function(){
        if (!isMaxWidth()) {
            $(this).stop().animate({'margin-top':'52px'});
            $(this).find('.n-main__col__form__inside').stop().animate({'top':'0px','height':'480px'});
            $(this).find('.n-main__col__form__abs').stop().animate({'top':'22px'},function(){
                $(this).css('z-index',5);
            });
        }
    },function(){
        if (!isMaxWidth()) {
            $(this).stop().animate({'margin-top':'-42px'});
            $(this).find('.n-main__col__form__abs').css('z-index',2).stop().animate({'top':'322px'});
            $(this).find('.n-main__col__form__inside').stop().animate({'top':'300px','height':'180px'});
        }
    });

    var sliderM;

    function createSliderM() {

        if (('.n-main__slider-m__container').length) {

            sliderM = new Swiper('.n-main__slider-m__container', {
                speed: 400,
                spaceBetween: 0,
                loop: true,
                slidesPerView: 6,
                nextButton: '.n-main__slider-m__arr-r',
                prevButton: '.n-main__slider-m__arr-l',
                onDestroy: function() {
                    sliderM = 0;
                }

            });

            function resizeSlider() {
                if (sliderM && $('.n-main__slider-m__container').length) {
                    if ($(document).width()<=1060) {
                        sliderM.params.slidesPerView = 3;
                        sliderM.onResize();
                    } else if ($(document).width()<=1300) {
                        sliderM.params.slidesPerView = 4;
                        sliderM.onResize();
                    } else {
                        sliderM.params.slidesPerView = 6;
                        sliderM.onResize();
                    }
                }
            }

            $(window).on('resize',resizeSlider);
            resizeSlider();
        }
    }

    function checkSlider() {
       if (isMobileWidth() && sliderM && $('.n-main__slider-m__container').length) {
           sliderM.destroy(true, true);
           $('.swiper-wrapper').removeAttr('style');
           $('.swiper-slide').removeAttr('style');
           $('.swiper-wrapper').addClass('swiper-wrapper--old');
           $('.swiper-slide').addClass('swiper-slide--old');
       }
       if (!isMobileWidth() && !sliderM) {
           $('.swiper-wrapper').removeClass('swiper-wrapper--old');
           $('.swiper-slide').removeClass('swiper-slide--old');
           createSliderM();
       }
    }

    createSliderM();
    checkSlider();

    $(window).resize(function(){
        checkSlider();
        showMenu();
        showLogs();

        if (isMiddleWidth()) {
            $('.n-main__col__form').find('.n-main__col__form__inside').css({'top':'0px','height':'480px'});
            $('.n-main__col__form').find('.n-main__col__form__abs').css({'top':'22px'});
            $('.n-main__col__form').css('margin-top','52px');
        }

        if (isMobileWidth() && popup) {
            popup.close();
        }

        if (isMobileWidth()) {
            $('.n-main__col__form').css('margin-top','15px');
        }
    })

    //!check-field//

    $(function() {
     $('.rf').each(function(){
     // Объявляем переменные (форма и кнопка отправки)
      var form = $(this),
      btn = form.find('.disabled');

     // Добавляем каждому проверяемому полю, указание что поле пустое
      form.find('.rfield').addClass('empty_field');

     // Функция проверки полей формы
      function checkInput(){
         form.find('.rfield').each(function(){
             if($(this).val() != ''){
         // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');
             } else {
         // Если поле пустое добавляем класс-указание
                $(this).addClass('empty_field');
             }
         });
       }

      // Функция подсветки незаполненных полей
      function lightEmpty(){
          var img = form.find('.empty_field').css('background-image');
        form.find('.empty_field').css({'border':'1px solid rgba(247,43,10,0.6)'});
        form.find('.empty_field').next().show();

      // Через полсекунды удаляем подсветку
        setTimeout(function(){
           form.find('.empty_field').removeAttr('style');
           $('.field-war').hide();
        },500);
       }

      // Проверка в режиме реального времени
        setInterval(function(){
      // Запускаем функцию проверки полей на заполненность
           checkInput();
      // Считаем к-во незаполненных полей
           var sizeEmpty = form.find('.empty_field').size();
      // Вешаем условие-тригер на кнопку отправки формы
           if(sizeEmpty > 0){
              if(btn.hasClass('disabled')){
                  return false
              } else {
                btn.addClass('disabled')
               }
            } else {
               btn.removeClass('disabled')
              }
         },500);

      // Событие клика по кнопке отправить
         btn.click(function(){
           if($(this).hasClass('disabled')){
      // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
              lightEmpty();
              return false
           } else {
     // Все хорошо, все заполнено, отправляем форму
              form.submit();
             }
         });
        });
      });

//!/check-field//

};
