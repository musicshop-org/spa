import * as React from 'react';

function PlayerDetails(props: any) {

    return (
        <div>
            <p style={{margin: 4}}><strong>Now Playing</strong></p>
            {props.song.title} by {props.artist}
        </div>
    )
}

export default PlayerDetails;
