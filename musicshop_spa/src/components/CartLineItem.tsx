import {ButtonBase, Divider, Grid, IconButton, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ClearIcon from '@mui/icons-material/Clear';
import ICartLineItemProbs from "./apis/ICartLineItemProbs";
import {CartLineItemDTO} from "../openAPI";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function CartLineItem(props: ICartLineItemProbs) {

    let cartLineItemDTO: CartLineItemDTO = props.cartLineItemDTO;
    if (cartLineItemDTO == null) {
        return null;
    }

    let artist: string = "";
    let artists: Set<string> | undefined = cartLineItemDTO.artists;
    if (artists != null) {
        artist = artists.values().next().value
    }

    let price: number = 0;
    if (cartLineItemDTO.price != null) {
        price = cartLineItemDTO.price;
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{width: 84, height: 84}}>
                        <Img alt="complex"
                             src={cartLineItemDTO.imageUrl}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="caption" component="div">
                                {cartLineItemDTO.productType}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {cartLineItemDTO.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: {artist}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="subtitle1" component="div" align={"right"}>
                                <IconButton aria-label="remove item" onClick={() => {
                                    // change button state to loading
                                    props.removeLineItem(cartLineItemDTO);
                                    // change button state to finish
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Typography sx={{mt: 2}} variant="subtitle1" component="div" align={"right"}>
                            {(Math.round(price * 100) / 100).toFixed(2)} €
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2, mb: 2}}/>
        </div>
    );
}