
var sell_list;

var list_main_photo;

var user_log_in;

var category_list;

window.onload = (function() {

    var nav_item = $('.nav__link');

    for (var index = 0; index < nav_item.length; index++ ) {

        var temp = nav_item[index];
        temp.addEventListener('click', toggleToActiveLink);

    }

    /*List */

    CreateListItems();
    CreateMainPhotoList();
    addSideBarAdmin();
    setInterval(change_main_photo,20000);

    setClick_Button_User();
    /*fix_main_menu();
    FillSellList();*/

    function CreateMainPhotoList() {
        list_main_photo = ["images/carusel/img_1.jpg","images/carusel/img_2.jpg","images/carusel/img_3.jpg","images/carusel/img_4.jpg"];
    }

    //Admin page//
    $('#input_img')[0].addEventListener('input',addEventShowAddImage,false);
    $('#input_other_img')[0].addEventListener('input',addEventShowOthersAddImage,false);
    $('#clear_photo')[0].addEventListener('click',clear_photo_in_admin_page,false);

    var admin_items_li = $('.sidebar_admin_li');

    for(var i =0; i <= admin_items_li.length; i++){
        admin_items_li[i].addEventListener('click',slide_active_admin_form)
    };

});

