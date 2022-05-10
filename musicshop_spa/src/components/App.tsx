import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import SideNavbar from "./SideNavbar";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <SideNavbar/>
            </BrowserRouter>
        );
    }
}

export default App;
