import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Theme from "../inc/theme";

import App from "./App";

function Root() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    let palette = Theme.palette;

    if (prefersDarkMode) {
        palette.mode = "dark";
    }

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: prefersDarkMode ? {mode: "dark"} : Theme.palette,
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