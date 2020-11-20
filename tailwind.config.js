const exposedVariables = {
    colors: 'color',
    screens: '-screen',
    fontFamily: false,
    fontSize: false,
    fontWeight: false,
    lineHeight: false,
    letterSpacing: false,
    backgroundSize: false,
    borderWidth: false,
    borderRadius: false,
    width: false,
    height: false,
    minWidth: false,
    minHeight: false,
    maxWidth: false,
    maxHeight: false,
    padding: false,
    margin: false,
    boxShadow: false,
    zIndex: false,
    opacity: false,
};

module.exports = {
    corePlugins: {
        container: false,
    },
    theme: {
        colors: {   
            'white': '#FFF',
            'black': '#000',                                    
            'gold': '#ffdf00',
            /* ---- */
            'rum': '#846d8f',
            'wistful': '#a0add5',
            'ebony-clay': '#1c212b',
            'charade': '#2b303b',
            'abbey': '#50585d',
            'bombay': '#b2b6bd',
            'loblolly': '#bbc7cc',
            'swamp-green': '#a3be8c',
            'sprout': '#CDE0BD',
            'juniper': '#739a99',
            'opal': '#aec5c4',
            'contessa': '#bf6165',
            'events': {
                'error': '#b00020',
                'on-error': '#ffffff',
                'success': '#3ab577',
                'on-success': '#ffffff',
                'warning': '#e65100',
                'on-warning': '#ffffff',
                'info': '#2481ea',
                'on-info': '#ffffff',
                'disabled': '#EEE',
                'on-disabled': '#999'
            }            
            
        },
        extend: {
            maxWidth: {
                screen: '100vw',
            },
        }
    },
    variants: {},
    plugins: [
        require('tailwindcss-pseudo-elements'),
        require('tailwind-css-variables')(exposedVariables, { postcssEachVariables: false }),
    ]
};