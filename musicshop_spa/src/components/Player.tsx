import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import PlayerDetails from './pages/PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props: any) {

    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    let length = props.songDTOs.length;

    useEffect(() => {
        if (isPlaying) {
            // @ts-ignore
            audioElement.current.play();
        } else {
            // @ts-ignore
            audioElement.current.pause();
        }
    });

    const nextSong = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;

            if (temp > length - 1) {
                temp = 0;
            }

            return temp;
        });
    }

    const previousSong = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;

            if (temp < 0) {
                temp = length-1;
            }

            return temp;
        });
    }


    return (
        <div>
            <audio src={`http://localhost:9000/download/${props.songDTOs[currentSongIndex].longId}`} ref={audioElement}></audio>
            <h4>Playing now</h4>
            <PlayerDetails
                song={props.songDTOs[currentSongIndex]}
                artist={props.songDTOs[currentSongIndex].artists[0].name}
            />
            <PlayerControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                nextSong={nextSong}
                previousSong={previousSong}
            />
            <p><strong>Next up: </strong> {props.songDTOs[nextSongIndex].title} by {props.songDTOs[nextSongIndex].artists[0].name}</p>
        </div>
    )
}

export default Player;
