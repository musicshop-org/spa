import React, {Component} from "react";
import {CartLineItemDTO, DefaultApi} from "../../openAPI";
import CartLineItem from "../CartLineItem";
import {Button, Grid, Typography} from "@mui/material";
import ShoppingCartHelper from "../../ShoppingCartHelper";
import Loader from "../Loader";
import ICartOverviewProps from "../apis/ICartOverviewProps";

class CartOverview extends Component<ICartOverviewProps, { cartReady: boolean, cartLineItemDTOs: Set<CartLineItemDTO> }> {

    private defaultApi: DefaultApi;
    private totalPrice: number;
    private readonly cartUUID: string | null;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();
        this.totalPrice = 0;
        this.cartUUID = ShoppingCartHelper.getCartUUID();

        this.state = {
            cartReady: false,
            cartLineItemDTOs: new Set(),
        }
    }

    componentDidMount() {
        if (this.cartUUID != null) {
            this.getShoppingCart(this.cartUUID);
        }
    }

    buyProducts(cartLineItems: Set<CartLineItemDTO>) {
        let jwt = window.localStorage.getItem("jwt");
        let cartLineItemsArray = Array.from(cartLineItems);

        if (jwt != null && this.cartUUID != null) {
            //show login dialog
            this.defaultApi.buyProductsWeb(jwt, this.cartUUID, cartLineItemsArray).then((success) => {
                if (success.status === 200) {
                    console.log(success.data)
                    window.location.assign("/playlist");
                }
            }, (error) => {
                console.log(error.response.data);
            });
        } else {
            this.props.openLogin()
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

                this.setState({cartReady: true , cartLineItemDTOs: cartLineItemDTOs});
            },
            error => {
                console.log(error);
            }
        );
    }

    removeLineItem(cartLineItemDTO: CartLineItemDTO): void {
        if (this.cartUUID != null) {
            this.defaultApi.removeLineItemFromCart(this.cartUUID, cartLineItemDTO)
                .then(
                    success => {
                        if (success.status === 200) {
                            let cartLineItemDTOs = new Set(this.state.cartLineItemDTOs);
                            cartLineItemDTOs.forEach(cartLineItem => {
                                if (cartLineItem.productId === cartLineItemDTO.productId) {
                                    cartLineItemDTOs.delete(cartLineItem);
                                }
                            });

                            if (cartLineItemDTO.price != undefined) {
                                this.totalPrice = this.totalPrice - cartLineItemDTO.price;
                            }

                            this.setState({cartLineItemDTOs: cartLineItemDTOs});

                            this.props.changeSnackbarMessageAndState("Product removed from cart", "success");
                            this.props.openSnackbar();
                        }
                    },
                    error => {
                        console.log(error);
                        this.props.changeSnackbarMessageAndState(error.response.data, "error");
                        this.props.openSnackbar();
                    }
                );
        }
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
                                                removeLineItem={(cartLineItemDTO) => this.removeLineItem(cartLineItemDTO)}
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
                                            <Button onClick={() => {
                                                this.buyProducts(cartLineItemDTOs)
                                            }} sx={{mt: 2}} variant={"contained"}>
                                                Checkout
                                            </Button>
                                        </Grid>


                                    </div>

                                ) : (
                                    <div>
                                        <Typography variant={"h6"}>
                                        Your Shopping Cart is Empty...
                                        </Typography>
                                        <Typography variant={"body2"}>
                                            Add some products to your cart by visiting the <a href={"/"}>Music Search page</a>.
                                            </Typography>
                                    </div>)
                            }
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default CartOverview;