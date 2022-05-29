import {SongDTO} from "../../openAPI";

interface ISongListProps {
    songDTOs: Set<SongDTO> | undefined;
    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}
export default ISongListProps;