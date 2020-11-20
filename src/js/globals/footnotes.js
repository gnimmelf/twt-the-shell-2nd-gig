/* eslint-env browser */

/**
 * Makes links to and back from footnote references
 * Reference: ^[noteId]^
 * Backlink: {{footnote:noteId}}
 */

(function ($, $$) {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const makeLink = (noteId, idx, isBackLink) => {
        const link = document.createElement("a");

        if (isBackLink) {
            link.innerHTML = '<strong>↩︎</strong>';
            link.id = `footnote:${noteId}`;
            link.href = `#footnote-ref:${noteId}`;
            link.className = 'footnote';
        }
        else {
            link.innerText = `[${idx + 1}]`;
            link.id = `footnote-ref:${noteId}`;
            link.href = `#footnote:${noteId}`;
        }

        console.log('link', link);

        return link;
    };

    const reFootnoteRef = new RegExp(/^\[(.*)\]/);
    const reFootnote = new RegExp(/^{{footnote\:(.*)}}/i);

    const handler = () => {
        // References
        $$('sup')
            .map(elm => ([elm.innerText.match(reFootnoteRef), elm]))
            .filter(([match]) => match)
            .forEach(([match, elm], idx) => {
                const noteId = match[1].toLowerCase();
                const link = makeLink(noteId, idx);
                elm.innerHTML = "";
                elm.appendChild(link);

            });
        // Backlinks
        $$('p')
            .map(elm => ([elm.innerText.match(reFootnote), elm]))
            .filter(([match]) => match)
            .forEach(([match, elm], idx) => {
                const noteId = match[1].toLowerCase();
                const backLink = makeLink(noteId, idx, true);
                elm.innerHTML = elm.innerHTML.replace(reFootnote, `${idx + 1}. <i>${capitalize(noteId)}</i>:`);
                elm.appendChild(backLink);
            });
    };

    document.addEventListener('DOMContentLoaded', handler);

})((selector) => document.querySelector(selector), (selector) => Array.from(document.querySelectorAll(selector)));
