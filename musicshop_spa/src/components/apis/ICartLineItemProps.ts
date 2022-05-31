import {CartLineItemDTO} from "../../openAPI";

interface ICartLineItemProps {
    cartLineItemDTO: CartLineItemDTO;
    removeLineItem: (cartLineItemDTO: CartLineItemDTO) => void;
}

export default ICartLineItemProps;
