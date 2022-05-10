import React, {Component} from 'react';

import {AlbumDTO, DefaultApi} from "../openAPI";

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
        this.defaultApi.findAlbumsByAlbumId(albumId).then(
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
        console.log(this.albumDTO);

        return (
            <div>
                <h1>Hello World</h1>

            </div>
        );
    }
}

export default ProductDetails;
