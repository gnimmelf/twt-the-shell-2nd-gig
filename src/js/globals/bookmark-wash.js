(function ($, $$) {

    const handler = () => {
        $$('.kg-bookmark-container .kg-bookmark-content > *')
            .forEach(elm => {
                elm.textContent = elm.textContent.replace(/<.*?>/g, '');
                console.log('Bookmark', elm);
            });
    };

    document.addEventListener('DOMContentLoaded', handler);

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));