export default (App) => (selector, props={}) => {
    const target = document.querySelector(selector);
    if (target) {

        target.innerHTML = '';

        const app = new App({ target, props });

        console.log('Svelte::App rendered', {target, App});
    }
    else {
        console.error('Svelte::Target not found', selector);
    }    
} 
