import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';

function PlayerControls(props: any) {

    return (
        <div className="shuffle-div">
            <IconButton className="shuffle-btn" color="primary" onClick={() => props.setIsShuffled(!props.isShuffled)}>
                {props.isShuffled ? <ShuffleOnIcon className="shuffle-icon"/> : <ShuffleIcon className="shuffle-icon"/>}
            </IconButton>
        </div>
    )
}

export default PlayerControls;
