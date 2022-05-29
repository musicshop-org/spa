import * as React from 'react';

function PlayerDetails(props: any) {

    return (
        <div>
            <h5>{props.song.longId}</h5>
            <h5>{props.song.title}</h5>
            <h5>{props.artist}</h5>
        </div>
    )
}

export default PlayerDetails;
