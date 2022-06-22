import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {
    Alert,
    Snackbar
} from "@mui/material";

import SideNavbar from "./SideNavbar";
import IAppProps from "./apis/IAppProps";

export default function App(props: IAppProps) {

    const [snackbarState, setSnackbarState] = React.useState("");
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const openSnackbar = () => {
        setSnackbarOpen(true);
    }
    const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    }
    const changeSnackbarMessageAndState = (message: string, state: string) => {
        setSnackbarMessage(message);
        setSnackbarState(state);
    }

    return (
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
            <SideNavbar
                toggleColorMode={props.toggleColorMode}
                openSnackbar={openSnackbar}
                changeSnackbarMessageAndState={changeSnackbarMessageAndState}
            />

            {
                snackbarOpen ? (
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                        message={snackbarMessage}
                    >
                        <Alert
                            severity={snackbarState.includes("success") ? "success" : "error"}
                            sx={{width: '100%'}}
                            onClose={closeSnackbar}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                ) : ("")
            }

        </BrowserRouter>
    );

}
