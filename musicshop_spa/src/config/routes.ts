import IRoute from "../interfaces/IRoute";
import MusicSearch from "../components/pages/MusicSearch";
import ProductDetails from "../components/pages/ProductDetails";
import CartOverview from "../components/pages/CartOverview";
import PlaylistOverview from "../components/pages/PlaylistOverview";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Music Search',
        element: MusicSearch,
        exact: true
    },
    {
        path: '/product-detail',
        name: 'Product Details',
        element: ProductDetails,
        exact: true
    },
    {
        path: '/shopping-cart',
        name: 'Shopping Cart',
        element: CartOverview,
        exact: true
    },
    {
        path: '/playlist',
        name: 'Playlist',
        element: PlaylistOverview,
        exact: true
    }
]

export default routes;