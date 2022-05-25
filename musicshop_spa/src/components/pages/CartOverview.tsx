import React, {Component} from "react";
import {CartLineItemDTO, DefaultApi} from "../../openAPI";
import CartLineItem from "../CartLineItem";
import {Button, Grid, Typography} from "@mui/material";
import ShoppingCartHelper from "../../ShoppingCartHelper";
import Loader from "../Loader";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

class CartOverview extends Component<{}, {openLogin: boolean, cartReady: boolean, cartLineItemDTOs: Set<CartLineItemDTO> }> {

    private defaultApi: DefaultApi;
    private totalPrice: number;


    constructor(props: any, handleLoginOpen: Function) {
        super(props);



        this.defaultApi = new DefaultApi();
        this.totalPrice = 0;

        this.state = {
            openLogin: false,
            cartReady: false,
            cartLineItemDTOs: new Set(),
        }
    }

    componentDidMount() {
        let cartUUID: string | null;
        if (window.localStorage.getItem("cartUUID") == null) {
            cartUUID = ShoppingCartHelper.generateUUID();
            window.localStorage.setItem('cartUUID', cartUUID);
        } else {
            cartUUID = window.localStorage.getItem("cartUUID");
        }

        if (cartUUID != null) {
            this.getShoppingCart(cartUUID);
        }
    }
    buyProducts(cartLineItems: Set<CartLineItemDTO>){
        let jwt = window.localStorage.getItem("jwt");
        let cartUUID = window.localStorage.getItem("cartUUID");
        let cartLineItemsArray = Array.from(cartLineItems);

        if(jwt != null && cartUUID != null) {
            //show login dialog
            this.defaultApi.buyProductsWeb(jwt , cartUUID ,cartLineItemsArray).then((success) => {
                if(success.status === 200) {
                    console.log(success.data)
                    window.location.assign("/playlist");
                }
            }, (error) => {
                console.log(error.response.data);
            });
        } else {
            alert("Please login first");
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

                this.setState({cartReady: true});
                this.setState({cartLineItemDTOs: cartLineItemDTOs});
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {

        const {cartReady} = this.state;
        const {cartLineItemDTOs} = this.state;

        return (
            <div>
                {
                    !cartReady ? (
                        <Loader/>
                    ) : (
                        <React.Fragment>
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

                            {
                                (cartLineItemDTOs.size > 0) ? (
                                    <div>
                                        <Grid container alignItems={"flex-end"}
                                              justifyContent={"flex-end"}>
                                            <Typography variant={"h6"}>
                                                Total: {(Math.round(this.totalPrice * 100) / 100).toFixed(2)} €
                                            </Typography>
                                        </Grid>

                                        <Grid container alignItems={"flex-end"}
                                              justifyContent={"flex-end"}>
                                            <Button onClick={() => {this.buyProducts(cartLineItemDTOs)}} sx={{mt: 2}} variant={"contained"}>
                                                Checkout
                                            </Button>
                                        </Grid>


                                    </div>

                                ) : (<div></div>)
                            }
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default CartOverview;