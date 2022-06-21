import React, {Component} from 'react';

import {Grid} from "@mui/material";

import {SongDTO} from "../../openAPI";
import Loader from "../Loader";
import Playlist from '../Playlist';
import Player from '../player/Player';

class PlaylistOverview extends Component<{}, { playlistReady: boolean, errorOccurred: boolean }> {

    private playlistMicroservice_url: string = 'http://localhost:9001/'
    // private playlistMicroservice_url: string = 'http://34.234.78.108/'

    private songs: SongDTO | undefined;

    constructor(props: any) {
        super(props);

        this.state = {
            playlistReady: false,
            errorOccurred: false
        }
    }

    private getPlaylist = async () => {
        let user = localStorage.getItem("user")
        let action = "playlist/" + user

        fetch(`${this.playlistMicroservice_url}${action}`)
            .then(response => response.json())
            .then(response => {
                    this.songs = response.songs;
                    this.setState({playlistReady: true});
                },
                error => {
                    this.setState({playlistReady: true, errorOccurred: true});
                    console.log(error.message);
                }
            );
    }

    componentDidMount() {
        this.getPlaylist();
    }

    render() {
        const {playlistReady, errorOccurred} = this.state;

        const mode = window.localStorage.getItem('mode') || 'dark';

        return (
            <div>
                {!playlistReady ? (
                    <Loader/>
                ) : (
                    !errorOccurred ? (
                        <Grid
                            container
                            direction="column"
                            style={{width: "100%"}}
                        >
                            <Grid
                                item
                            >
                                <Playlist songDTOs={this.songs}/>
                            </Grid>
                            <Grid
                                item
                                className={"player-container " + mode}
                            >
                                <Player songDTOs={this.songs}/>
                            </Grid>
                        </Grid>
                    ) : (
                        <div>
                            {"Playlist is empty"}
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default PlaylistOverview;
