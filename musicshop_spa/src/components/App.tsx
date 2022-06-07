import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import SideNavbar from "./SideNavbar";
import IAppProps from "./apis/IAppProps";

class App extends Component<IAppProps>{

    render() {
        return (
            <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
                <SideNavbar toggleColorMode={this.props.toggleColorMode}/>
            </BrowserRouter>
        );
    }
}

export default App;
