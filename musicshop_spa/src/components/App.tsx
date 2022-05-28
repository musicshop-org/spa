import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import SideNavbar from "./SideNavbar";
import IAppProbs from "./apis/IAppProbs";

class App extends Component<IAppProbs>{

    render() {
        return (
            <BrowserRouter>
                <SideNavbar toggleColorMode={this.props.toggleColorMode}/>
            </BrowserRouter>
        );
    }
}

export default App;
