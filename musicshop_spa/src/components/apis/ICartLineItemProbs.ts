import {CartLineItemDTO} from "../../openAPI";

interface ICartLineItemProbs {
    cartLineItemDTO: CartLineItemDTO;
    removeLineItem: (cartLineItemDTO: CartLineItemDTO) => void;
}

export default ICartLineItemProbs;
