
function toggleToActiveLink (event) {

    var links = $('.nav__link');

    for (var index = 0; index < links.length; index++) {
        if (links[index].classList.contains('nav__link--active')) {
            links[index].classList.remove('nav__link--active');
            break;
        }
    }

    event.target.classList.add('nav__link--active');

}


function setClick_Button_User(event) {

    var buttons = $('.btn_user');

    for (var index = 0; index < buttons.length; index++ ) {

        var temp_btn = buttons[index];
        temp_btn.addEventListener('click', ShowUserMenu_Sign_in);
    }

    var menu_user_close = $('.menu_user_close');
    for (var index = 0; index < menu_user_close.length; index++ ) {
        menu_user_close[index].addEventListener('click', HideUserMenu_Sign_in);
    }

    buttons = $('.user_menu_choice');

    for (var index = 0; index < buttons.length; index++ ) {

        var temp_btn = buttons[index];
        temp_btn.addEventListener('click', Choice_User_Menu);
    }

}

function ShowUserMenu_Sign_in(event) {

    var temp = $('.menu_user');
    temp.slideToggle(5);

    var user_menu_choices = $('.user_menu_choice');

    for (var index = 0; index < user_menu_choices.length; index++ ) {

        temp = user_menu_choices[index];
        if(temp.classList.contains('user_menu_choice_active')){
            temp.classList.remove('user_menu_choice_active');
        }
    }

    Choice_User_Menu(event);

}

function HideUserMenu_Sign_in(event) {

    if ($('.menu_registration').visible){
        $('.menu_registration').hide();
    }

    else if($('.menu_sign_in').visible){
        $('.menu_sign_in').hide();
    }

    $('.menu_user').hide();

}

function Choice_User_Menu(event) {

    var temp_value = $('.' + event.target.value);
    var menu_registration = $('.menu_registration');
    var menu_sign_in = $('.menu_sign_in');

    if(event.target.value == 'menu_sign_in'){

        $('.menu_user_sign_in').css('max-height','210px');
        menu_registration.hide();

    }
    else {
        $('.menu_user_registration').css('max-height','250px');
        menu_sign_in.hide();
    }

    if(temp_value.visible){
        temp_value.hide();
    }
    else {
        temp_value.show();
    }

}

function User_Log_in(event) {

    Check_Users_Information_Fill();

    var temp_user = {
        login : $('.user_login').val(),
        password: $('.user_pass').val()
    };

    //Connect_users(temp_user);
}

function Check_Users_Information_Fill() {

}
