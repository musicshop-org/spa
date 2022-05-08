import React, {Component} from 'react';
import SideNavbar from './SideNavbar';
import TextField from '@mui/material/TextField';

class MusicSearch extends Component {
    render() {
        return (
            <div>
                <TextField
                    id={"music-search-input"}
                    label={"Search..."}
                    variant={"filled"}
                    style={{width: "30%"}}
                />
            </div>
        );
    }
}

export default MusicSearch;
