import React, {Component} from 'react';
import SideNavbar from './SideNavbar';
import TextField from '@mui/material/TextField';

class MusicSearch extends Component {
    render() {
        return (
            <div>
                {/*<Container >*/}
                {this.searchBarContent()}

                <Divider/>

                {/*<Container sx={{mt: 2}}>*/}

                <Grid
                    sx={{mt: 1}}
                    container
                    spacing={2}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                >

                    {
                        Array.from(albumDTOs).map((albumDTO, key) => {
                            return (
                                <Grid
                                    item
                                    key={key}
                                >
                                    <ProductCard
                                        albumDTO={albumDTO}
                                    />

                                </Grid>
                            )
                        })
                    }

                </Grid>


                {/*</Container>*/}
                {/*</Container>*/}
            </div>
        );
    }
}

export default MusicSearch;
