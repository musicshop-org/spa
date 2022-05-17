import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Grid, Button, Paper, Typography, ButtonBase} from '@mui/material';
import {Box} from "@mui/system";
import {Link} from "react-router-dom";
import CartGenerator from "../CartGenerator";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ProductCard(albumDTO: any) {
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
                    <Link to={"/product-detail?albumId=" + albumDTO.albumDTO.albumId.albumId}>
                        <ButtonBase sx={{width: 128, height: 128}}>
                            <Img alt="complex"
                                 src={albumDTO.albumDTO.imageUrl}/>
                        </ButtonBase>
                    </Link>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div">
                                {albumDTO.albumDTO.title} ({albumDTO.albumDTO.releaseDate.split('-')[0]})
                            </Typography>
                            <Typography variant="subtitle2" component="div" gutterBottom>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: {albumDTO.albumDTO.songs.values().next().value.artists[0].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Type: {albumDTO.albumDTO.mediumType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Stock: {albumDTO.albumDTO.stock}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div" align={"right"}>
                            {albumDTO.albumDTO.price} €
                        </Typography>
                        <Box sx={{pt: 8}} display="flex" justifyContent="flex-end">
                            <Typography sx={{cursor: 'pointer'}} variant="body2">
                                <Button variant={"text"} onClick={() => {
                                    CartGenerator.addAlbumsToCart(albumDTO.albumDTO);
                                }}>
                                    Add to cart
                                </Button>
                                <Link to={"/product-detail?albumId=" + albumDTO.albumDTO.albumId.albumId}>
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
