import { Component, useEffect, useState, useRef } from 'react';
import '../resources/App.css';

const AudioPlayer = (audioURL) => {
    const [play, setPlay] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const max = 20;

    return (
        <div>
            <p>
                audio player
            </p>
            <audio ref={audioRef} src={audioURL}/>
        </div>
    )
}

export default AudioPlayer;