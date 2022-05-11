import React, {Component} from 'react';

import {Container, Divider} from '@mui/material';
import {AlbumDTO, DefaultApi} from "../../openAPI";
import ProductDetailHeader from "../ProductDetailHeader";
import Loader from "../Loader";
import SongList from "../SongList";

class ProductDetails extends Component<{}, { albumReady: boolean }> {

    private defaultApi: DefaultApi;
    private albumDTO: AlbumDTO | undefined;

    constructor(props: any) {
        super(props);

        this.defaultApi = new DefaultApi();

        this.state = {
            albumReady: false,
        }
    }

    componentDidMount() {
        let albumId = new URLSearchParams(window.location.search).get("albumId")
        if (albumId == null) {
            return;
        }

        this.searchAlbumByAlbumId(albumId);
    }

    private searchAlbumByAlbumId(albumId: string): void {
        this.defaultApi.findAlbumByAlbumId(albumId).then(
            success => {
                if (success == null || success.data == null) {
                    console.log("Ohje.. 🐜");
                    return;
                }

                this.albumDTO = success.data;

                this.setState({albumReady: true});
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {

        const {albumReady} = this.state;

        return (
            <div>
                {
                    !albumReady ? (
                        <Loader/>
                    ) : (
                        <React.Fragment>
                            <div style={{margin: 20}}>
                                <ProductDetailHeader
                                    albumDTO={this.albumDTO}
                                />
                            </div>

                            {/*<Divider/>*/}
                            <div style={{marginTop: 40}}>
                                <SongList
                                    songDTOs={this.albumDTO?.songs}
                                />
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default ProductDetails;
