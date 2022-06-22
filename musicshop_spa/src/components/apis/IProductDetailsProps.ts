interface IProductDetailsProps {
    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}

export default IProductDetailsProps;