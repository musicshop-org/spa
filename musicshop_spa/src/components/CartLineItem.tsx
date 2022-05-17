import {ButtonBase, Divider, Grid, IconButton, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {DefaultApi} from "../openAPI";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function CartLineItem(cartLineItemDTO: any) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{width: 84, height: 84}}>
                        <Img alt="complex"
                             src={cartLineItemDTO.cartLineItemDTO.imageUrl}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="caption" component="div">
                                {cartLineItemDTO.cartLineItemDTO.productType}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {cartLineItemDTO.cartLineItemDTO.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: ?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Medium Type: {cartLineItemDTO.cartLineItemDTO.mediumType}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="subtitle1" component="div" align={"right"}>
                                <IconButton aria-label="decrease quantity" sx={{mr: 1}} onClick={() => {
                                    let defaultApi = new DefaultApi();

                                    if (cartLineItemDTO.cartLineItemDTO.quantity == 1) {
                                        // defaultApi.removeLineItemFromCart(cartLineItemDTO.cartLineItemDTO);
                                    } else {
                                        // defaultApi.changeLineItemQuantity(cartLineItemDTO.cartLineItemDTO, cartLineItemDTO.cartLineItemDTO.quantity - 1)
                                    }
                                }}>
                                    <RemoveIcon />
                                </IconButton>
                                {cartLineItemDTO.cartLineItemDTO.quantity}x
                                <IconButton aria-label="increase quantity" sx={{ml: 1}} onClick={() => {
                                    let defaultApi = new DefaultApi();

                                    if (cartLineItemDTO.cartLineItemDTO.quantity < cartLineItemDTO.cartLineItemDTO.stock) {
                                        // defaultApi.changeQuantity(cartLineItemDTO.cartLineItemDTO, cartLineItemDTO.cartLineItemDTO.quantity + 1);
                                    }
                                }}>
                                    <AddIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Typography variant="subtitle1" component="div" align={"right"}>
                            {cartLineItemDTO.cartLineItemDTO.price}.00 €
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2, mb: 2}}/>
        </div>
    );
}