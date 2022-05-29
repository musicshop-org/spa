import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import PlayerDetails from './pages/PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props: any) {

    const audioElement = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    let artist = props.songDTOs[currentSongIndex].artists[0].name;
    let song = props.songDTOs[currentSongIndex];


    return (
        <div>
            <audio src="http://localhost:9000/download/2" ref={audioElement}></audio>
            <h4>Playing now</h4>
            <PlayerDetails song={song} artist={artist}/>
            <PlayerControls />
            <p><strong>Next up: Kindest Regards by Witt Lowry</strong></p>
        </div>
    )
}

export default Player;
