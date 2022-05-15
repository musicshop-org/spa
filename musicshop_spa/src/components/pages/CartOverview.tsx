import React, {Component} from "react";
import {AlbumDTO, DefaultApi} from "../../openAPI";
import Loader from "../Loader";
import ProductDetailHeader from "../ProductDetailHeader";
import SongList from "../SongList";
import CartLineItem from "../CartLineItem";
import {Button, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";

class CartOverview extends Component {


    componentDidMount() {

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