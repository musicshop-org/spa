import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function PlayerControls() {

    return (
        <div>
            <IconButton color="primary"> <SkipPreviousIcon /> </IconButton>
            <IconButton color="primary"> <PlayIcon /> </IconButton>
            <IconButton color="primary"> <SkipNextIcon /> </IconButton>
        </div>
    )
}

export default PlayerControls;
