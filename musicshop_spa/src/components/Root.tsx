import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Theme from "../inc/theme";

import App from "./App";
import {Switch} from "@mui/material";


function Root() {

    const [mode, setMode] = React.useState("light");

    const theme = React.useMemo(
        () =>
            createTheme({
                            palette: mode==="dark" ? {mode: "dark"} : Theme.palette,
                        }),
        [mode]
    );

    const toggleColorMode = () => {
        setMode(mode === "light" ? "dark" : "light")
    }


    // setMode(mode === "light" ? "dark" : "light")}
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