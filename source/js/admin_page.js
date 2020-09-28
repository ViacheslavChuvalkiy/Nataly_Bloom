
function addEventShowAddImage() {

    var admin_img_block = $('.main_image_admin_form');

    if(admin_img_block[0] && this.files[0]) {

        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(this.files[0]);
        img.onload = function() {
            window.URL.revokeObjectURL(this.src);
        }
        admin_img_block[0].appendChild(img);

    }
}

function addEventShowOthersAddImage() {

    var admin_images_block = $('.others_image_admin_form');

    if(admin_images_block[0] && this.files.length) {

        for(var i = 0; i < this.files.length;i++){

            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(this.files[i]);
            img.onload = function () {
                window.URL.revokeObjectURL(this.src);
            };

            var img_elem = $('.others_image_admin_form img')

            if (img_elem.length == 6) {
                break;
            }

            if(img_elem[0]) {
                admin_images_block[0].insertBefore(img,img_elem[0]);
            }
            else {
                admin_images_block[0].appendChild(img);
            }
        }

    }
}

function clear_photo_in_admin_page() {

    var admin_images_block = $('.others_image_admin_form');

    while (admin_images_block[0].firstChild) {
        admin_images_block[0].removeChild(admin_images_block[0].firstChild);
    }
}

function addSideBarAdmin() {

    var main__list = $('.sidebar_admin_ul');
    options_list = [{name: 'Добавить товар',
                        form: 'add_sale_items_form'},
                    {name: 'Изменить товар',
                        form: 'add_sale_items_form'},
                    {name: 'Удалить товар',
                        form: 'add_sale_items_form'},
                    {name: 'Настроить основною страницу',
                        form: 'add_sale_items_form'},
                    {name: 'Настроить основную страницу лукбук',
                        form: 'add_sale_items_form'},
                    {name: 'Загрузить фото на сервер',
                        form: 'add_item_photos_form'}
                        ];

        var item = main__list[0];

        for (var c = 0; c < options_list.length; c++) {

            var child = document.createElement("li");
            child.classList.add('sidebar_admin_li');
            child.href = options_list[c].form;

            var text = document.createTextNode(options_list[c].name);

            child.appendChild(text);

            item.appendChild(child);
        }


}

function slide_active_admin_form(event) {

    var current_form = event.target.href;

    var admin_forms = $('.admin_form');

    for (var i = 0; i <= admin_forms.length; i++ ){

        var temp_form = admin_forms[i];

        if(!temp_form){
            continue;
        }

        if(temp_form.classList.contains('active_admin_form')){
            temp_form.classList.remove('active_admin_form');
        }
        else {
            continue;
        }
    }

    var active_form = $('.' + current_form);
    active_form[0].classList.add('active_admin_form');
}