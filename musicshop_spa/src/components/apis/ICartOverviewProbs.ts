interface ICartOverviewProbs {
    openLogin: () => void;
    closeLogin: () => void;

    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}

export default ICartOverviewProbs;