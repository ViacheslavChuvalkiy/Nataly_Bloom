
function CreateListItems() {

    var main__list = $('.sidebar-menu');
    category_list = ['Блузы', 'Рубашки', 'Платья', 'Юбки', 'Брюки', 'Джемперы', 'Свитеры', 'Кардиганы', 'Кофты', 'Пиджаки', 'Костюмы'];

    for (var i = 0; i< main__list.length; i++) {

        var item = main__list[i];

        if (item.classList.contains('list-stocks') === true) {
            continue;
        }

        for (var c =0; c < category_list.length; c++) {

            var child = document.createElement("li");
            child.classList.add('sidebar-menu');
            child.classList.add('list--choice');
            child.href = '#';
            var text = document.createTextNode(list[c]);

            child.appendChild(text);

            item.appendChild(child);
        };
    };

}

function change_main_photo(event) {

    var herosection = $('.hero-img').attr("src");

    var index_current_img = list_main_photo.indexOf(herosection);

   if (list_main_photo.length == index_current_img + 1) {

       $('.hero-img').attr("src", list_main_photo[0]);
   }
   else {
       $('.hero-img').attr("src", list_main_photo[index_current_img + 1]);
       }

}

function FillSellList() {

    var main__list = $('.container_grid');
    sell_list = create_sell_list();
    fill_sell_list(1);

}

function fix_main_menu() {

    var elem_menu = $('.header_mainmenu');
    var elem_side_bar = $('.sidebar');
    var elem_hero = $('.hero');
    var span_hero = $('.span_hero');


    $(window).scroll(function(){
        if ($(this).scrollTop() > 187) {
            elem_menu.addClass("fix_class_main_menu");
            elem_side_bar.addClass("fix_class_side_bar");
            elem_hero.addClass("fix_class_hero");
            span_hero.addClass("margin_top");
        } else {
            elem_menu.removeClass("fix_class_main_menu");
            elem_side_bar.removeClass("fix_class_side_bar");
            elem_hero.removeClass("fix_class_hero");
            span_hero.removeClass("margin_top");
        }
    });
}

function create_sell_list() {

    var item1 = {
        id_number: "1",
        name: "Крутое платье для выходных",
        old_price: "300 $",
        price: "255 $",
        scr: "images/dress/8.jpg",
        category: "dress"
    };

    var item2 = {
        id_number: "2",
        name: "Крутое платье для выходных",
        old_price: "200 $",
        price: "155 $",
        scr: "images/dress/17.jpg",
        category: "dress"
    };

    var item3 = {
        id_number: "3",
        name: "Крутое платье для выходных",
        old_price: "60 $",
        price: "55 $",
        scr: "images/dress/18.jpg",
        category: "dress"
    };

    var item4 = {
        id_number: "4",
        name: "Крутое платье для выходных",
        old_price: "80 $",
        price: "55 $",
        scr: "images/dress/10.jpg",
        category: "dress"
    };

    var item5 = {
        id_number: "5",
        name: "Крутое платье для выходных",
        old_price: "120 $",
        price: "105 $",
        scr: "images/dress/14.jpg",
        category: "dress"
    };

    var item6 = {
        id_number: "6",
        name: "Крутое платье для выходных",
        old_price: "300 $",
        price: "255 $",
        scr: "images/dress/16.jpg",
        category: "dress"
    };

    var item7 = {
        id_number: "7",
        name: "Крутая футболка для выходных",
        old_price: "80 $",
        price: "55 $",
        scr: "images/dress/10.jpg",
        category: "t-short"
    };

    var item8 = {
        id_number: "8",
        name: "Крутая футболка для выходных",
        old_price: "120 $",
        price: "105 $",
        scr: "images/dress/14.jpg",
        category: "t-short"
    };

    var item9 = {
        id_number: "9",
        name: "Крутая футболка для выходных",
        old_price: "300 $",
        price: "255 $",
        scr: "images/dress/16.jpg",
        category: "t-short"
    };

    var dress = [item1,item2,item3,item4,item5,item6];
    var t_short = [item7,item8,item9];
    return [dress,t_short];
}

function fill_sell_list(page_number,sell_category) {

    var counts_items = sell_list.length;
    var max_items_on_page = 6 * page_number;
    var min_items_on_page = max_items_on_page - 6 + 1;

    if (counts_items > min_items_on_page) {

    var grid_main_items = $('.grid_main_item');
    var i = 0;

    for (min_items_on_page; min_items_on_page <= max_items_on_page; min_items_on_page++) {

    var arr_sell_block = $(grid_main_items[i]);

    if (counts_items[min_items_on_page]) {


    }
    else {


    }


    i++;
    }

    }
}