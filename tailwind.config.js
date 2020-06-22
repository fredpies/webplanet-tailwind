module.exports = {
    purge: false,
    theme: {

        // DESKTOP FIRST BREAKPOINTS
        screens: {

          xxl: { max: '1920px' },
          xl: { max: '1680px' },
          xl2: { max: '1440px' },
          lg: { max: '1280px' },
          md: { max: '1024px' },
          sm: { max: '768px' },
          xsm: { max: '480px' },
          iphone5: { max: '320px' },

        },

        extend: {

        zIndex: {
            auto: 'auto',
            '0': '0',
            '10': '10',
            '20': '20',
            '30': '30',
            '40': '40',
            '50': '50',
            '60': '60',
        },

        // MAIN COLORS
        // All custom colors have 'wp-' prefix
        colors: {

          wp : {
            orange: '#FF6701',
            'orange-dark': '#8B380D',
            'red': '#cc3f14',
            'yellow': '#F7E4BE',
            'green': '#06734D',
            'blue-dark': '#010433',
            'spinner-background': '#010B12',
            'blue-darker': '#0e0e14',
            'blue-background': '#232333',
            'blue-table-background': '#2c2c40',
            'blue-lighter': '#27334A',
            'blue-light': '#7ED4F6',
            'blue-light-2': '#62a5bf',
            'black-transparent': 'hsl(120, 100%, 0%, 0.4)'
          }

      },

        width: theme => ({
            auto: 'auto',
            ...theme('spacing'),
            '11p': '11%',
            '14p': '14%',
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.666667%',
            '2/6': '33.333333%',
            '3/6': '50%',
            '4/6': '66.666667%',
            '5/6': '83.333333%',
            '1/12': '8.333333%',
            '2/12': '16.666667%',
            '3/12': '25%',
            '4/12': '33.333333%',
            '5/12': '41.666667%',
            '6/12': '50%',
            '7/12': '58.333333%',
            '8/12': '66.666667%',
            '9/12': '75%',
            '10/12': '83.333333%',
            '11/12': '91.666667%',
            full: '100%',
            screen: '100vw',
        }),

        // FONTS
        fontFamily: {
        audiowide: ['audiowide', 'sans-serif'],
        roboto: ['roboto', 'sans-serif'],
        },

        fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.4rem',
        '3xl': '1.775rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
    },

        spacing: {
                px: '1px',
                '0': '0',
                '1': '0.25rem',
                '2': '0.5rem',
                '3': '0.75rem',
                '4': '1rem',
                '5': '1.25rem',
                '6': '1.5rem',
                '8': '2rem',
                '10': '2.5rem',
                '12': '3rem',
                '14': '3.5rem',
                '15': '3.75rem',
                '17': '4.25rem',
                '18': '4.5rem',
                '19': '4.75rem',
                '20': '5rem',
                '21': '5.25rem',
                '22': '5rem',
                '23': '5.75rem',
                '24': '6rem',
                '25': '6.25rem',
                '26': '6.5rem',
                '27': '6.75rem',
                '28': '7rem',
                '29': '7.25rem',
                '30': '7.5rem',
                '31': '7.75rem',
                '32': '8rem',
                '33': '8.25rem',
                '34': '8.5rem',
                '35': '8.75rem',
                '36': '9rem',
                '37': '9.25rem',
                '38': '9.75rem',
                '40': '10rem',
                '39': '7.5rem',
                '52': '13rem',
                '58': '14.5rem',
                '60': '15rem',
                '62': '15.5rem',
                '64': '16rem',
                '66': '16.5rem',
                '67': '17rem',
                '68': '17.5rem',
                '72': '18rem',
                '82': '20.5rem',
                '84': '21rem',
                '90': '22.5rem',
                '92': '23rem',
                '96': '24rem',
        },

        opacity: {
            '85': '0.85',
        },

    },

    },

    plugins: [],
}