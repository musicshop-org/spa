import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function PlayerControls(props: any) {

    return (
        <div>
            <IconButton color="primary" onClick={() => props.previousSong()}>
                <SkipPreviousIcon />
            </IconButton>

            <IconButton color="primary" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                {!props.isPlaying ? <PlayIcon />: <PauseIcon />}
            </IconButton>

            <IconButton color="primary" onClick={() => props.nextSong()}>
                <SkipNextIcon />
            </IconButton>
        </div>
    )
}

export default PlayerControls;
