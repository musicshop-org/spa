export default interface IRoute {
    path: string;
    name: string;
    element: any;
    exact: boolean;
    props?: any;
}