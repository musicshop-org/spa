import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Grid, Button, Paper, Typography, ButtonBase} from '@mui/material';
import {Box} from "@mui/system";
import {Link} from "react-router-dom";
import {AlbumDTO, DefaultApi} from "../openAPI";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function addToCart(albumDTO: AlbumDTO){
    let defaultApi = new DefaultApi();
    let cartUUID: string|null;
    if (window.localStorage.getItem("cartUUID") === null) {
        cartUUID = generateUUID();
        window.localStorage.setItem('cartUUID', cartUUID);
    } else{
        cartUUID = window.localStorage.getItem("cartUUID");
    }

    defaultApi.addToCart(albumDTO, cartUUID);
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


export default function ProductCard(albumDTO: any) {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                width: 520,
                flexGrow: 1,
                // backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Link to={"/product-detail?albumId=" + albumDTO.albumDTO.albumId.albumId}>
                        <ButtonBase sx={{width: 128, height: 128}}>
                            <Img alt="complex"
                                 src="https://media.hitparade.ch/cover/big/alexander_marcus-papaya_s.jpg"/>
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
                                    addToCart(albumDTO.albumDTO);
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
