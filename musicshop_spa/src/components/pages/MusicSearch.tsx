import React, {Component} from 'react';

import {TextField, Button, Grid, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {DefaultApi} from "../../openAPI";
import ProductCard from "../ProductCard";
import {AlbumDTO} from "../../openAPI";
import Loader from "../Loader";

class MusicSearch extends Component<{}, { searchFinished: boolean, albumDTOs: Set<AlbumDTO> }> {

    private searchString: string;
    private defaultApi: DefaultApi;

    constructor(props: any) {
        super(props);

        this.searchString = "";
        this.defaultApi = new DefaultApi();

        this.state = {
            searchFinished: true,
            albumDTOs: new Set(),
        }
    }

    private searchMusic(): void {
        this.setState({searchFinished: false});

        this.defaultApi.findAlbumsBySongTitle(this.searchString).then(
            (response) => {
                if (response == null || response.data == null) {
                    console.log("Request Error");
                    return;
                }

                if (response.status !== 200) {
                    console.log(response.data);
                    return;
                }

                let albumDTOs = new Set<AlbumDTO>();

                for (let i = 0; i < response.data.length; i++) {
                    albumDTOs.add(response.data[i]);
                }

                this.setState({searchFinished: true});
                this.setState({albumDTOs: albumDTOs});
            },
            (error) => {
                if (error == null || error.response == null) {
                    console.log("Request Error");
                    return;
                }

                console.log(error.response.data);
            }
        );
    }

    private searchBarContent() {
        return (
            <Grid container justifyContent={"flex-start"} sx={{mb: 3}}>
                <TextField
                    size={"small"}
                    id={"music-search-input"}
                    label={"Search..."}
                    variant={"filled"}
                    style={{width: "30%", minWidth: 300}}
                    onChange={(e) => {
                        this.searchString = e.target.value;
                    }}
                />

                <Button

                    sx={{ml: 3, mt: 1, mb: 1}} variant={"contained"}
                    onClick={() => {
                        this.searchMusic();
                    }}
                    startIcon={<SearchIcon/>}
                >
                    Search
                </Button>
            </Grid>
        );
    }

    render() {

        const {searchFinished} = this.state;
        const {albumDTOs} = this.state;

        return (
            <div>
                {this.searchBarContent()}

                <Divider/>

                {
                    !searchFinished ? (
                        <div style={{margin: 20}}>
                            <Loader/>
                        </div>
                    ) : (
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
                    )
                }
            </div>
        );
    }
}

export default MusicSearch;