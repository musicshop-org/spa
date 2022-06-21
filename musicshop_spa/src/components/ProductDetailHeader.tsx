import * as React from 'react';

import {styled} from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {LoadingButton} from "@mui/lab";
import {
    ButtonBase,
    Grid,
    Typography
} from '@mui/material';

import ShoppingCartHelper from "../ShoppingCartHelper";
import IProductDetailHeaderProps from "./apis/IProductDetailHeaderProps";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function ProductDetailHeader(props: IProductDetailHeaderProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <Grid
            container
            spacing={2}
            direction={"row"}
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"flex-start"}
        >
            <Grid item>
                <ButtonBase sx={{width: 256, height: 256}}>
                    <Img alt="complex"
                         src={props.albumDTO?.imageUrl}/>
                </ButtonBase>
            </Grid>

            <Grid item sm={true} container>
                <Grid item xs>
                    <Typography variant="overline">
                        {"ALBUM"}
                    </Typography>
                    <Typography variant="h2" component="div">
                        <b>
                            {props.albumDTO?.title}
                        </b>
                    </Typography>
                    <Typography>
                        {props.albumDTO?.songs?.values().next().value.artists[0].name} • {props.albumDTO?.mediumType} • {props.albumDTO?.releaseDate} • {props.albumDTO?.songs?.size} Songs
                        🎵
                    </Typography>


                </Grid>
            </Grid>

            <Grid item>

                <Typography variant="h5" component="div" align={"right"}>
                    <span style={{marginRight: 10}}>
                        {(Math.round((props.albumDTO?.price || 0) * 100) / 100).toFixed(2)} €
                    </span>
                </Typography>

                <LoadingButton
                    variant={"text"}
                    loading={isLoading}
                    endIcon={<ShoppingCartIcon/>}
                    onClick={() => {
                        setIsLoading(true);
                        ShoppingCartHelper.addAlbumsToCart(props.albumDTO)
                            .then(success => {
                                props.changeSnackbarMessageAndState("Album added to cart", "success");
                                props.openSnackbar();
                            }, error => {
                                props.changeSnackbarMessageAndState(error.response.data, "error");
                                props.openSnackbar();
                            })
                            .finally(() => {
                                setIsLoading(false);
                            })
                    }}
                >
                    Add Album to cart
                </LoadingButton>

            </Grid>

        </Grid>
    );
}

export default ProductDetailHeader;
