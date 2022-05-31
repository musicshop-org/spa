import {AlbumDTO} from "../../openAPI";

interface IProductCardProps {
    albumDTO: AlbumDTO;
    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}
export default IProductCardProps;
