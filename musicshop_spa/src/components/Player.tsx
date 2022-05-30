import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import PlayerDetails from './pages/PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props: any) {
    
    const audioElement = useRef(null);
    const length = props.songDTOs.length;
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(length > 1 ? currentSongIndex + 1 : currentSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            // @ts-ignore
            audioElement.current.play();
        } else {
            // @ts-ignore
            audioElement.current.pause();
        }
    });

    useEffect(() => {
        setNextSongIndex(currentSongIndex < length -1 ? currentSongIndex + 1 : 0);
    }, [currentSongIndex]);

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
        <div style={{textAlign: "center"}}>
            <audio src={`http://localhost:9000/download/${props.songDTOs[currentSongIndex].longId}`} ref={audioElement}></audio>
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
            {length > 1 ?
            <div>
                <strong>Next up: </strong> {props.songDTOs[nextSongIndex].title}
            </div> :
            null}
        </div>
    )
}

export default Player;
