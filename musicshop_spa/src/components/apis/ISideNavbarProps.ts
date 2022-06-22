interface ISideNavbarProps {
    toggleColorMode: () => void;
    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}

export default ISideNavbarProps;