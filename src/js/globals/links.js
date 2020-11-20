(function ($, $$) {

    const handler = () => {
        $$('.koenig-content a')
            .forEach(elm => {
                if (elm.href) {
                    const url = new URL(elm.href);
                    if (url.hostname !== location.hostname) {
                        elm.target = '_blank'
                    }
                }
                console.log('Link', elm);
            });
    };

    document.addEventListener('DOMContentLoaded', handler);

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));