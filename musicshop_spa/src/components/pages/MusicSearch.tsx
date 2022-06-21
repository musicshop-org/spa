import React, {Component} from 'react';

import {Button, Divider, Grid, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {AlbumDTO, DefaultApi} from "../../openAPI";
import ProductCard from "../ProductCard";
import Loader from "../Loader";
import IMusicSearchProps from "../apis/IMusicSearchProps";

class MusicSearch extends Component<IMusicSearchProps, { searchFinished: boolean, albumDTOs: Set<AlbumDTO> }> {

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
                let albumDTOs = new Set<AlbumDTO>();

                for (let i = 0; i < response.data.length; i++) {
                    albumDTOs.add(response.data[i]);
                }

                this.setState({searchFinished: true});
                this.setState({albumDTOs: albumDTOs});
            },
            (error) => {
                this.props.changeSnackbarMessageAndState(error.response.data, "error");
                this.props.openSnackbar();

                this.setState({searchFinished: true});
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
                        <Loader/>
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
                                                openSnackbar={() => this.props.openSnackbar()}
                                                changeSnackbarMessageAndState={(message, state) => this.props.changeSnackbarMessageAndState(message, state)}
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