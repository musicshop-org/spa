import * as React from 'react';

function PlayerDetails(props: any) {

    return (
        <div className="player--details">
            <div className="details-title">
                {props.song.title}
            </div>
            
            <div className="details-artist">
                {props.artist}
            </div>
        </div>
    )
}

export default PlayerDetails;
