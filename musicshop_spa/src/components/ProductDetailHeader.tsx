import * as React from 'react';
import {styled} from '@mui/material/styles';
import {Grid, Button, Typography, ButtonBase} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartGenerator from "../CartGenerator";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function ProductDetailHeader(albumDTO: any) {
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
                         src={albumDTO.albumDTO.imageUrl}/>
                </ButtonBase>
            </Grid>

            <Grid item sm={true} container>
                <Grid item xs>
                    <Typography variant="overline">
                        {"ALBUM"}
                    </Typography>
                    <Typography variant="h2" component="div">
                        <b>
                            {albumDTO.albumDTO.title}
                        </b>
                    </Typography>
                    <Typography>
                        {albumDTO.albumDTO.songs.values().next().value.artists[0].name} • {albumDTO.albumDTO.mediumType} • {albumDTO.albumDTO.releaseDate} • {albumDTO.albumDTO.songs.length} Songs 🎵
                    </Typography>


                </Grid>
            </Grid>

            <Grid item>

                <Typography variant="h5" component="div" align={"right"}>
                    <span style={{marginRight: 10}}>
                        {(Math.round(albumDTO.albumDTO.price * 100) / 100).toFixed(2)} €
                    </span>
                </Typography>

                <Button variant={"text"} endIcon={<ShoppingCartIcon />} onClick={() => {
                    CartGenerator.addAlbumsToCart(albumDTO.albumDTO);
                }}>
                    Add Album to cart
                </Button>

            </Grid>

        </Grid>
    );
}

export default ProductDetailHeader;
