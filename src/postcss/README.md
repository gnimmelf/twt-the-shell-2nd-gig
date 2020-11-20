# Colors usage

1. Set colors in `/tailwind.config.js`
2. "Distribute" the colors on to the "variables-sections" in `/vars.postcss`
    ```
    %vars-main-header {
        --bg-color: rgba(theme('colors.black'), 0.5);
        --fg-color: theme('colors.white');
        [...]
    }
    ```
3. `%extend` with the "color-sections" to do the actual styling:
    ```
    .main-header {
        @extend %vars-main-header;    
        background-color: var(--bg-color);
        color: var(--fg-color);
        [...]
    }
    ```