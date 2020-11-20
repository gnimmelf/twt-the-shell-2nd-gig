(function ($, $$) {

    const handler = () => {
        $$('.koenig-content table')
            .forEach(elm => {
                const wrapper = document.createElement("div");
                wrapper.className = 'overflow-wrapper';
                wrapper.style = 'overflow-x: auto';
                wrapper.appendChild(elm.cloneNode(true))
                elm.replaceWith(wrapper);
                console.log('Table', elm);
            });
    };

    document.addEventListener('DOMContentLoaded', handler);

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));