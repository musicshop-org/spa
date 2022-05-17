import React, {Component} from "react";
import {CartLineItemDTO, DefaultApi} from "../../openAPI";
import CartLineItem from "../CartLineItem";
import {Button, Grid, Typography} from "@mui/material";
import CartGenerator from "../../CartGenerator";

class CartOverview extends Component<{}, { cartLineItemDTOs: Set<CartLineItemDTO> }> {

    private defaultApi: DefaultApi;
    private totalPrice: number;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();
        this.totalPrice = 0;

        this.state = {
            cartLineItemDTOs: new Set(),
        }
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

        //TODO: ask marco why promise is resolved twice
        this.defaultApi.displayShoppingCart(cartUUID).then(
            success => {
                this.totalPrice = 0;
                if (success == null || success.data == null) {
                    console.log("Error occurred while displaying shopping cart");
                    return;
                }

                let cartLineItemDTOs = new Set<CartLineItemDTO>();

                if (success.data.cartLineItems != undefined) {
                    let price: number | undefined;

                    for (let i = 0; i < success.data.cartLineItems.length; i++) {
                        cartLineItemDTOs.add(success.data.cartLineItems[i]);
                        price = success.data.cartLineItems[i].price;

                        if (price != undefined) {
                            this.totalPrice = this.totalPrice + (price);
                        }
                    }
                }

                this.setState({cartLineItemDTOs: cartLineItemDTOs})
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {

        const {cartLineItemDTOs} = this.state;

        return (
            <div>
                {
                    Array.from(cartLineItemDTOs).map((cartLineItemDTO, key) => {
                        return (
                            <Grid
                                item
                                key={key}
                            >
                                <CartLineItem
                                    cartLineItemDTO={cartLineItemDTO}
                                />
                            </Grid>
                        )
                    })
                }

                {(cartLineItemDTOs.size > 0) ? (
                    <div>
                        <Grid container alignItems={"flex-end"}
                              justifyContent={"flex-end"}>
                            <Typography variant={"h6"}>
                                Total: {(Math.round(this.totalPrice * 100) / 100).toFixed(2)} €
                            </Typography>
                        </Grid>

                        <Grid container alignItems={"flex-end"}
                              justifyContent={"flex-end"}>
                            <Button sx={{mt: 2}} variant={"contained"}>
                                Checkout
                            </Button>
                        </Grid>
                    </div>
                    ) : (<div></div>)}
            </div>
        );
    }
}

export default CartOverview;