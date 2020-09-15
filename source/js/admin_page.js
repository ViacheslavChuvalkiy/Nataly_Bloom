
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
    options_list = ['Добавить товар', 'Изменить товар', 'Удалить товар', 'Настроить основною страницу', 'Настроить основную страницу лукбук'];

    for (var i = 0; i< main__list.length; i++) {

        var item = main__list[i];

        for (var c =0; c < options_list.length; c++) {

            var child = document.createElement("li");
            child.classList.add('sidebar_admin_li');
            child.href = '#';
            var text = document.createTextNode(options_list[c]);

            child.appendChild(text);

            item.appendChild(child);
        };
    };

}