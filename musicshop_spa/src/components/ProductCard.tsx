import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Grid, Button, Paper, Typography, ButtonBase} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {Box} from "@mui/system";
import {Link} from "react-router-dom";
import ShoppingCartHelper from "../ShoppingCartHelper";
import IProductCardProps from "./apis/IProductCardProps";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ProductCard(props: IProductCardProps) {

    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                width: 520,
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Link to={"/product-detail?albumId=" + props.albumDTO?.albumId?.albumId}>
                        <ButtonBase sx={{width: 128, height: 128}}>
                            <Img alt="complex"
                                 src={props.albumDTO?.imageUrl}/>
                        </ButtonBase>
                    </Link>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div">
                                {props.albumDTO?.title} ({props.albumDTO?.releaseDate?.split('-')[0]})
                            </Typography>
                            <Typography variant="subtitle2" component="div" gutterBottom>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: {props.albumDTO?.songs?.values().next().value.artists[0].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Type: {props.albumDTO?.mediumType}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div" align={"right"}>
                            {(Math.round((props.albumDTO?.price || 0) * 100) / 100).toFixed(2)} €
                        </Typography>
                        <Box sx={{pt: 8}} display="flex" justifyContent="flex-end">
                            <Typography sx={{cursor: 'pointer'}} variant="body2">
                                <LoadingButton variant={"text"} loading={isLoading} onClick={() => {
                                    setIsLoading(true);
                                    ShoppingCartHelper.addAlbumsToCart(props.albumDTO)
                                        .then(success => {
                                            props.changeSnackbarMessageAndState("Album added to cart", "success");
                                            props.openSnackbar();
                                        }, error => {
                                            props.changeSnackbarMessageAndState(error.message.data, "error");
                                            props.openSnackbar();
                                        })
                                        .finally(() => {
                                            setIsLoading(false);
                                        });

                                }}>
                                    Add to cart
                                </LoadingButton>
                                <Link to={"/product-detail?albumId=" + props.albumDTO?.albumId?.albumId}>
                                    <Button
                                        variant={"text"}
                                    >
                                        View
                                    </Button>
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
