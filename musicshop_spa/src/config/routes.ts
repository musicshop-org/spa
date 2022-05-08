import IRoute from "../interfaces/IRoute";
import MusicSearch from "../components/MusicSearch";


const routes: IRoute[] = [
    {
        path: '/',
        name: 'Music Search',
        element: MusicSearch,
        exact: true
    }
]

export default routes;