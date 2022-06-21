import React, {Component} from "react";

import {LoadingButton} from "@mui/lab";
import {
    Grid,
    Typography
} from "@mui/material";

import ShoppingCartHelper from "../../ShoppingCartHelper";
import Loader from "../Loader";
import ICartOverviewProps from "../apis/ICartOverviewProps";
import {CartLineItemDTO, DefaultApi} from "../../openAPI";
import CartLineItem from "../CartLineItem";

class CartOverview extends Component<ICartOverviewProps, { isLoading: boolean, cartReady: boolean, cartLineItemDTOs: Set<CartLineItemDTO> }> {

    private defaultApi: DefaultApi;
    private totalPrice: number;
    private readonly cartUUID: string | null;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();
        this.totalPrice = 0;
        this.cartUUID = ShoppingCartHelper.getCartUUID();

        this.state = {
            isLoading: false,
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
        return new Promise((resolve, reject) => {
            let jwt = window.localStorage.getItem("jwt");
            let cartLineItemsArray = Array.from(cartLineItems);

            if (jwt != null && this.cartUUID != null) {
                //show login dialog
                this.defaultApi.buyProductsWeb(jwt, this.cartUUID, cartLineItemsArray).then(
                    (success) => {
                        resolve(success);

                        if (success.status === 200) {
                            window.location.assign((process.env.REACT_APP_ROUTER_BASE || "") + "/playlist");
                        }
                    },
                    (error) => {
                        reject(error);

                        if (error.response.status === 401) {
                            this.props.openLogin();
                        }
                    });
            } else {
                reject();
                this.props.openLogin();
            }
        });
    }

    private getShoppingCart(cartUUID: string): void {

        this.defaultApi.displayShoppingCart(cartUUID).then(
            success => {
                this.totalPrice = 0;
                if (success == null || success.data == null) {
                    console.log("Error occurred while displaying shopping cart");
                    return;
                }

                let cartLineItemDTOs = new Set<CartLineItemDTO>();

                if (success.data.cartLineItems != null) {
                    let price: number | undefined;

                    for (let i = 0; i < success.data.cartLineItems.length; i++) {
                        cartLineItemDTOs.add(success.data.cartLineItems[i]);
                        price = success.data.cartLineItems[i].price;

                        if (price != null) {
                            this.totalPrice = this.totalPrice + (price);
                        }
                    }
                }

                this.setState({cartReady: true, cartLineItemDTOs: cartLineItemDTOs});
            },
            error => {
                this.props.changeSnackbarMessageAndState(error.response.data, "error");
                this.props.openSnackbar();
            }
        );
    }

    removeLineItem(cartLineItemDTO: CartLineItemDTO) {
        if (this.cartUUID != null) {
            return new Promise((resolve, reject) => {
                if (this.cartUUID != null) {
                    this.defaultApi.removeLineItemFromCart(this.cartUUID, cartLineItemDTO).then(
                        (response) => {
                            if (response.status === 200) {
                                let cartLineItemDTOs = new Set(this.state.cartLineItemDTOs);
                                cartLineItemDTOs.forEach(cartLineItem => {
                                    if (cartLineItem.productId === cartLineItemDTO.productId) {
                                        cartLineItemDTOs.delete(cartLineItem);
                                    }
                                });

                                // update total price
                                if (cartLineItemDTO.price != null) {
                                    this.totalPrice = this.totalPrice - cartLineItemDTO.price;
                                }

                                this.setState({cartLineItemDTOs: cartLineItemDTOs});

                                resolve(response);
                            }
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                }
            });
        }
    }

    render() {

        const {isLoading, cartReady, cartLineItemDTOs} = this.state;

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
                                                openSnackbar={() => this.props.openSnackbar()}
                                                changeSnackbarMessageAndState={(message, state) => this.props.changeSnackbarMessageAndState(message, state)}
                                            />
                                        </Grid>
                                    )
                                })
                            }

                            {
                                (cartLineItemDTOs.size > 0) ? (
                                    <div>
                                        <Grid container alignItems={"flex-end"}
                                              justifyContent={"flex-end"}
                                        >
                                            <Typography variant={"h6"}>
                                                Total: {(Math.round(this.totalPrice * 100) / 100).toFixed(2)} €
                                            </Typography>
                                        </Grid>

                                        <Grid container alignItems={"flex-end"}
                                              justifyContent={"flex-end"}
                                        >
                                            <LoadingButton
                                                sx={{mt: 2}}
                                                variant={"contained"}
                                                loading={isLoading}
                                                onClick={() => {
                                                    this.setState({isLoading: true});

                                                    this.buyProducts(cartLineItemDTOs)
                                                        .then(success => {
                                                            this.props.changeSnackbarMessageAndState("Items bought successfully", "success");
                                                            this.props.openSnackbar();
                                                        }, error => {
                                                            if (error != null) {
                                                                this.props.changeSnackbarMessageAndState(error.response.data, "error");
                                                                this.props.openSnackbar();
                                                            }
                                                        })
                                                        .finally(() => {
                                                            this.setState({isLoading: false});
                                                        });
                                                }}
                                            >
                                                Checkout
                                            </LoadingButton>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div>
                                        <Typography variant={"h6"}>
                                            Your Shopping Cart is Empty...
                                        </Typography>
                                        <Typography variant={"body2"}>
                                            {"Add some products to your cart by visiting the "}
                                            <a href={(process.env.REACT_APP_ROUTER_BASE || '') + "/"}>
                                                Music Search page
                                            </a>.
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