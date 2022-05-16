import {ButtonBase, Divider, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {SongDTO} from "../openAPI";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function CartLineItem(songDTO: SongDTO) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{width: 84, height: 84}}>
                        <Img alt="complex"
                             src="https://media.hitparade.ch/cover/big/alexander_marcus-papaya_s.jpg"/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div">
                                Man in the mirror
                            </Typography>
                            <Typography variant="subtitle2" component="div" gutterBottom>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Artist: Michael Jackson
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Type: Digital
                            </Typography>
                            {/*<Typography variant="body2" color="text.secondary">*/}
                            {/*    Stock: test*/}
                            {/*</Typography>*/}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div" align={"right"}>
                            12.00 €
                        </Typography>
                        <Box sx={{pt: 8}} display="flex" justifyContent="flex-end">
                            <Typography sx={{cursor: 'pointer'}} variant="body2">
                                {/*<Link to={"/product-detail?albumId=" + albumDTO.albumDTO.albumId.albumId}>*/}
                                {/*    <Button*/}
                                {/*        variant={"text"}*/}
                                {/*    >*/}
                                {/*        View*/}
                                {/*    </Button>*/}
                                {/*</Link>*/}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{mt: 2, mb: 2}}/>
        </div>
    );
}