import {AlbumDTO} from "../../openAPI";

interface IProductDetailHeaderProps {
    albumDTO: AlbumDTO | undefined;
    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}

export default IProductDetailHeaderProps;