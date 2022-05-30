import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props: any) {

    const downloadMicroservice_url: string = 'http://localhost:9000/'

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
    }, [isPlaying]);

    useEffect(() => {
        fetchCurrentSong(props.songDTOs[currentSongIndex].longId);
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

    const fetchCurrentSong = (songId: number) => {
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
            let url = URL.createObjectURL(blob);
            // @ts-ignore
            audioElement.current.src = url;

            if (isPlaying)
            { // @ts-ignore
                audioElement.current.play();
            }
        })
        .catch(error => {console.log(error.message)})
    }


    return (
        <div style={{textAlign: "center"}}>
            {/*<audio src={`http://localhost:9000/download/${props.songDTOs[currentSongIndex].longId}`} ref={audioElement}></audio>*/}
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
            {length > 1 ?
            <div>
                <strong>Next up: </strong> {props.songDTOs[nextSongIndex].title}
            </div> :
            null}
        </div>
    )
}

export default Player;
