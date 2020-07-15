
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