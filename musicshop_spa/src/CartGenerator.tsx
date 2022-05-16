import {AlbumDTO, DefaultApi, SongDTO} from "./openAPI";

class CartGenerator {
    static addToCart(albumDTO: AlbumDTO){
        let defaultApi = new DefaultApi();
        let cartUUID: string|null;
        if (window.localStorage.getItem("cartUUID") == null) {
            cartUUID = this.generateUUID();
            window.localStorage.setItem('cartUUID', cartUUID);
        } else{
            cartUUID = window.localStorage.getItem("cartUUID");
        }

        if(cartUUID != null) {
            defaultApi.addToCart(cartUUID, albumDTO);
        }
    }

    static addSongsToCart(songDTOs: Array<SongDTO>){
        let defaultApi = new DefaultApi();
        let cartUUID: string|null;
        if (window.localStorage.getItem("cartUUID") == null) {
            cartUUID = this.generateUUID();
            window.localStorage.setItem('cartUUID', cartUUID);
        } else{
            cartUUID = window.localStorage.getItem("cartUUID");
        }

        if(cartUUID != null) {
            defaultApi.addSongsToCart(cartUUID, songDTOs);
        }
    }

    static generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
export default CartGenerator;