"use client";
import React from 'react'; 
import Image from 'next/image'; 
import { useRef } from 'react';


interface DigitProps {
    name: string;
    character: string;
    pinyin: string;
    audioSrc: string;
    drawingGif: string;
}

const Digit: React.FC<DigitProps> = ({name, character, pinyin, audioSrc, drawingGif}) => {

    const audioRef = useRef<HTMLAudioElement>(null); 

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };



    return (
        <div className="mb-8 p-4 border rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="text-4xl font-bold mr-4">{name}</div>
                <button onClick={playAudio} className="mb-4 bg-blue-500 text-white py-1 px-2 rounded mt-2 hover:bg-blue-700">
                        Play Pronunciation
                </button>
            </div>
            
            <div className="flex items-center text-center flex-col">
                    <div className="text-4xl font-bold mb-2">{character}</div>
                    <div className="text-2xl mb-2">{pinyin}</div>
            </div>
            <div className="flex flex-col items-center">
                <Image 
                    src={drawingGif} 
                    alt={`How to draw ${character}`} 
                    width={200}
                    height={200}
                    unoptimized={true}
                />

                
                <audio ref={audioRef}>
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default Digit
  