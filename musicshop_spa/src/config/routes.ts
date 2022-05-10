import IRoute from "../interfaces/IRoute";
import MusicSearch from "../components/MusicSearch";
import ProductDetails from "../components/ProductDetails";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Music Search',
        element: MusicSearch,
        exact: true
    },
    {
        path: '/product-detail/',
        name: 'Product Details',
        element: ProductDetails,
        exact: true
    }
]

export default routes;