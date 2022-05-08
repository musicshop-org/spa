import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import App from "./App";

function Root() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // TODO:: use our own theme🚓🚓🚀
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider>
                <CssBaseline/>
                <App/>
            </StyledEngineProvider>
        </ThemeProvider>
    );
}

export default Root;