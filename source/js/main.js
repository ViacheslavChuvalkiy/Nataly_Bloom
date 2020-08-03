
var sell_list;

var list_main_photo;


window.onload = (function() {

    var nav_item = $('.nav__link');

    for (var index = 0; index < nav_item.length; index++ ) {

        var temp = nav_item[index];
        temp.addEventListener('click', toggleToActiveLink);

    }

    /*List */

    CreateListItems();
    CreateMainPhotoList();
    setInterval(change_main_photo,20000);
    /*fix_main_menu();
    FillSellList();*/

    function CreateMainPhotoList() {
        list_main_photo = ["images/carusel/img_1.jpg","images/carusel/img_2.jpg","images/carusel/img_3.jpg","images/carusel/img_4.jpg"];
    }

});

