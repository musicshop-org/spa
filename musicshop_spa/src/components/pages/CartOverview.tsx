import React, {Component} from "react";
import {CartLineItemDTO, DefaultApi, ShoppingCartDTO} from "../../openAPI";
import CartLineItem from "../CartLineItem";
import {Button, Grid, Typography} from "@mui/material";
import CartGenerator from "../../CartGenerator";

class CartOverview extends Component {

    private defaultApi: DefaultApi;
    private shoppingCart: ShoppingCartDTO | undefined;
    private cartLineItemDTOs: Array<CartLineItemDTO> | undefined;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();
    }

    componentDidMount() {
        let cartUUID: string | null;
        if (window.localStorage.getItem("cartUUID") == null) {
            cartUUID = CartGenerator.generateUUID();
            window.localStorage.setItem('cartUUID', cartUUID);
        } else {
            cartUUID = window.localStorage.getItem("cartUUID");
        }

        if (cartUUID != null) {
            this.getShoppingCart(cartUUID);
        }
    }

    private getShoppingCart(cartUUID: string): void {
        this.defaultApi.displayShoppingCart(cartUUID).then(
            success => {
                if (success == null || success.data == null) {
                    console.log("Error occurred while displaying shopping cart");
                    return;
                }

                this.shoppingCart = success.data;
                this.cartLineItemDTOs = this.shoppingCart.cartLineItems;
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {

        return (
            <div>
                <CartLineItem></CartLineItem>
                <CartLineItem></CartLineItem>
                <CartLineItem></CartLineItem>
                <CartLineItem></CartLineItem>
                <Grid container alignItems={"flex-end"}
                      justifyContent={"flex-end"}>
                    <Typography variant={"h6"}>Total: 12.00 €</Typography>

                </Grid>
                <Grid container alignItems={"flex-end"}
                      justifyContent={"flex-end"}>
                    <Button sx={{mt: 2}} variant={"contained"}>
                        Checkout
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default CartOverview;