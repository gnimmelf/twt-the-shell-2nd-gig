/* eslint-env browser */

/**
 * If text of img-alt starts with "photo", move the text into a `small.photo-credit`
 */

(function ($, $$) {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const rePhotoCredit = new RegExp(/^(photo|credit|©)(:| by)? (.*)/i);

    const handler = () => {

        // Featured image caption
        var featuredCaptionElm = $('.koenig-content featured-figcaption');
        if (featuredCaptionElm) {
            $('#featured-figcaption').innerHTML = featuredCaptionElm.innerHTML;
            featuredCaptionElm.remove();
        }

        // Koenig images
        $$('.koenig-content .kg-image-card img')
            .map(elm => ([elm.alt.match(rePhotoCredit), elm]))
            .filter(([match]) => match)
            .forEach(([match, elm]) => {
                const creditText = `©: ${match.pop()}`;

                const creditElm = document.createElement("small");
                creditElm.className = 'photo-credit';

                const textElm = document.createElement("span");
                textElm.innerText = capitalize(creditText);
                creditElm.appendChild(textElm);

                elm.parentElement.insertBefore(creditElm, elm.nextElementSibling);
                creditElm.addEventListener("click", () => creditElm.classList.toggle('show'));

                console.log('Photo', creditText, creditElm);
            });
    };

    document.addEventListener('DOMContentLoaded', handler);

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));