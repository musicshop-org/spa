import React, {PureComponent} from 'react';
import Bars from "react-loading-icons/dist/esm/components/bars";

class Loader extends PureComponent {
    render() {
        return (
            <Bars style={{paddingTop: 25, paddingLeft: 25}}/>
        );
    }
}

export default Loader;