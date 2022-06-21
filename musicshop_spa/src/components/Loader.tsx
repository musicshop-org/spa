import React, {PureComponent} from 'react';
import {LinearProgress} from "@mui/material";

class Loader extends PureComponent {
    render() {
        return (
            <LinearProgress style={{margin: "35vh 40vh", height: "3px"}}/>
        );
    }
}

export default Loader;