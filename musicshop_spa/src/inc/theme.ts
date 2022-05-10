import {createTheme} from '@mui/material/styles';
import {amber, grey, green, orange, red, blue} from '@mui/material/colors'

const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },

    palette: {
        mode: "light",

        primary: {
            light: '#2d3a4d',
            main: '#28294b',
            dark: '#42447c',
        },

        secondary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
        },

        error: {
            light: red[300],
            main: red[500],
            dark: red[700],
        },

        warning: {
            light: orange[300],
            main: orange[500],
            dark: orange[700],
        },

        info: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
        },

        success: {
            light: green[300],
            main: green[500],
            dark: green[700],
        }
    },

    mixins: {
        // toolbar: {
        //
        //
        //     // input: {
        //     //     fontFamily: 'Comic Sans, sans-serif',
        //     //     fontSize: '14px',
        //     // },
        // }
    },
});

export default theme;