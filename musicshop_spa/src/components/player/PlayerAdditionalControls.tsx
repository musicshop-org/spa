import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';

function PlayerAdditionalControls(props: any) {

    return (
        <div className="shuffle-div">
            <IconButton className="shuffle-btn" color="primary" onClick={() => props.setIsShuffled(!props.isShuffled)}>
                {
                    props.isShuffled ? (
                        <ShuffleOnIcon className="shuffle-icon"/>
                    ) : (
                        <ShuffleIcon className="shuffle-icon"/>
                    )
                }
            </IconButton>
        </div>
    )
}

export default PlayerAdditionalControls;
