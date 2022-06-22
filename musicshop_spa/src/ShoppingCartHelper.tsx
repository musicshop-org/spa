import {AlbumDTO, CartLineItemDTO, DefaultApi, SongDTO} from "./openAPI";

class ShoppingCartHelper {

    static generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;//random number between 0 and 16

            //Use timestamp until depleted
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }

            //Use microseconds since page-load if supported
            else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static getCartUUID() {
        let cartUUID: string | null;
        if (window.localStorage.getItem("cartUUID") == null) {
            cartUUID = this.generateUUID();
            window.localStorage.setItem('cartUUID', cartUUID);
        } else {
            cartUUID = window.localStorage.getItem("cartUUID");
        }

        return cartUUID;
    }

    static addAlbumsToCart(albumDTO: AlbumDTO | undefined) {
        return new Promise((resolve, reject) => {
            let defaultApi = new DefaultApi();
            let cartUUID = this.getCartUUID();

            if (cartUUID != null) {
                defaultApi.addAlbumsToCart(cartUUID, albumDTO).then(
                    (response) => {
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        });
    }

    static addSongsToCart(songDTOs: Array<SongDTO>) {
        return new Promise ((resolve, reject) => {
            let defaultApi = new DefaultApi();
            let cartUUID = this.getCartUUID();

            if (cartUUID != null) {
                defaultApi.addSongsToCart(cartUUID, songDTOs).then(
                    (response) => {
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        });
    }

    static removeLineItemFromCart(cartLineItemDTO: CartLineItemDTO) {
        let defaultApi = new DefaultApi();
        let cartUUID = this.getCartUUID();

        if (cartUUID != null) {
            defaultApi.removeLineItemFromCart(cartUUID, cartLineItemDTO);
        }
    }

}

export default ShoppingCartHelper;