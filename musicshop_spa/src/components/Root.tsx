import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import Theme from "../inc/theme";
import App from "./App";

function Root() {

    const [mode, setMode] = React.useState(window.localStorage.getItem('mode') || 'dark');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: mode === "dark" ? {mode: "dark"} : Theme.palette,
            }),
        [mode]
    );

    const toggleColorMode = () => {
        window.localStorage.setItem("mode", mode === "light" ? "dark" : "light");
        setMode(mode === "light" ? "dark" : "light")
    }

    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider>
                <CssBaseline/>
                <App toggleColorMode={toggleColorMode}/>
            </StyledEngineProvider>
        </ThemeProvider>
    );
}

export default Root;