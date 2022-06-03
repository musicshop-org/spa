import {CartLineItemDTO} from "../../openAPI";

interface ICartLineItemProps {
    cartLineItemDTO: CartLineItemDTO;
    removeLineItem: (cartLineItemDTO: CartLineItemDTO) => Promise<unknown> | undefined;

    openSnackbar: () => void;
    changeSnackbarMessageAndState: (message: string, state: string) => void;
}

export default ICartLineItemProps;
