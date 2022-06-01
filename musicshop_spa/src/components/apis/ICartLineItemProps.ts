import {CartLineItemDTO} from "../../openAPI";

interface ICartLineItemProps {
    cartLineItemDTO: CartLineItemDTO;
    removeLineItem: (cartLineItemDTO: CartLineItemDTO) => Promise<unknown> | undefined;
}

export default ICartLineItemProps;
