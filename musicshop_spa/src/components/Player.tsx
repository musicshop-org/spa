import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import { IconButton } from '@mui/material';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';
import PlayerAdditionalControls from './PlayerAdditionalControls';

function Player(props: any) {

    const downloadMicroservice_url: string = 'http://localhost:9000/'
    const audioElement = useRef(null);
    const length = props.songDTOs.length;

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(length > 1 ? currentSongIndex + 1 : currentSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    
    useEffect(() => {
        handlePlayingAudio();
    }, [isPlaying]);

    useEffect(() => {
        setSongInPlayer(props.songDTOs[currentSongIndex].longId);
        setNextSongIndex(currentSongIndex < length -1 ? currentSongIndex + 1 : 0);
    }, [currentSongIndex]);

    const setSongInPlayer = (songId: number) => {
        let token: string | null = localStorage.getItem('jwt')
        let action = "download/" + songId

        fetch(`${downloadMicroservice_url}${action}`, {
            method: 'GET',
            headers: new Headers({
                "Authorization": token != null ? token: ""
            })
        })
            .then(response => response.blob())
            .then(blob => {
                let currentSong = URL.createObjectURL(blob);
                // @ts-ignore
                audioElement.current.src = currentSong;

                if (isPlaying)
                { // @ts-ignore
                    audioElement.current.play();
                }
            })
            .catch(error => {console.log(error.message)})
    }

    const handlePlayingAudio = () => {
        if (isPlaying) {
            // @ts-ignore
            audioElement.current.play();
        } else {
            // @ts-ignore
            audioElement.current.pause();
        }
    }

    const getRandomIndex = () => {
        let randomIndex = Math.floor(Math.random() * length);

        while (randomIndex === currentSongIndex) {
            randomIndex = Math.floor(Math.random() * length);
        }

        return randomIndex;
    }

    const nextSong = () => {
        setCurrentSongIndex(() => {

            let temp = currentSongIndex;

            if (isShuffled) {
                temp = getRandomIndex();
            } else {
                temp++;

                if (temp > length - 1) {
                    temp = 0;
                }
            }

            return temp;
        });
    }

    const previousSong = () => {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;

            if (temp < 0) {
                temp = length - 1;
            }

            return temp;
        });
    }

    return (
        <React.Fragment>
            <audio ref={audioElement}></audio>
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
            <PlayerAdditionalControls 
                isShuffled={isShuffled}
                setIsShuffled={setIsShuffled}
            />

            {length > 1 && !isShuffled ?
                <div className="player-next">
                    <strong>Next up:</strong>{props.songDTOs[nextSongIndex].title}
                </div> :
                null
            }
        </React.Fragment>
    )
}

export default Player;
