import React, {Component} from 'react';
import {SongDTO, DefaultApi} from "../../openAPI";
import ProductDetailHeader from "../ProductDetailHeader";
import Loader from "../Loader";
import SongList from "../SongList";
import Playlist from '../Playlist';

class PlaylistOverview extends Component<{}, { playlistReady: boolean}> {

    private defaultApi: DefaultApi;
    private playlistMicroservice_url: string = 'http://localhost:9001/'

    private songs: SongDTO | undefined;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();

        this.state = {
            playlistReady: false
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
                console.log(error);
            }
        );
    }

    componentDidMount() {
        this.getPlaylist();
    }

    render() {
        const {playlistReady} = this.state;

        return (
            <React.Fragment>
                {
                    !playlistReady ? (
                        <Loader/>
                    ) :
                    <div style={{marginTop: 40}}>
                        <Playlist songDTOs={this.songs} />
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default PlaylistOverview;
