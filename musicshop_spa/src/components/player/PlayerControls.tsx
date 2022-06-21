import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

function PlayerControls(props: any) {

    return (
        <div className="player--controls">
            <IconButton className="skip-btn" color="primary" onClick={() => props.previousSong()}>
                <SkipPreviousIcon className="skip-icon"/>
            </IconButton>

            <IconButton className="play-btn" color="primary" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                {
                    !props.isPlaying ? (
                        <PlayIcon className="play-icon"/>
                    ) : (
                        <PauseIcon className="play-icon"/>
                    )
                }
            </IconButton>

            <IconButton className="skip-btn" color="primary" onClick={() => props.nextSong()}>
                <SkipNextIcon className="skip-icon"/>
            </IconButton>
        </div>
    )
}

export default PlayerControls;
