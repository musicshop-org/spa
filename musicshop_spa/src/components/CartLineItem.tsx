import {Button, ButtonBase, Divider, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import {styled} from "@mui/material/styles";

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
                            <Typography variant="subtitle1" component="div">
                                {cartLineItemDTO.cartLineItemDTO.name}
                            </Typography>
                            <Typography variant="subtitle2" component="div" gutterBottom>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: ?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Type: {cartLineItemDTO.cartLineItemDTO.mediumType}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
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