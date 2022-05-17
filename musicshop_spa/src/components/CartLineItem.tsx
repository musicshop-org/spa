import {ButtonBase, Divider, Grid, IconButton, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import ClearIcon from '@mui/icons-material/Clear';
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
                                Artist: {cartLineItemDTO.cartLineItemDTO.artists[0]}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="subtitle1" component="div" align={"right"}>

                                <IconButton aria-label="remove item" sx={{ml: 1}} onClick={() => {
                                    let defaultApi = new DefaultApi();

                                    //TODO: implement remove single LineItem from cart in backend

                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Typography>
                        </Grid>
                        <Typography sx={{mt: 2}} variant="subtitle1" component="div" align={"right"}>
                            {(Math.round(cartLineItemDTO.cartLineItemDTO.price * 100) / 100).toFixed(2)} €
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2, mb: 2}}/>
        </div>
    );
}