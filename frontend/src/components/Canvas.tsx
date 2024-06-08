"use client";

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

interface CanvasProps {
    setPrediction: (prediction: number | null) => void;
}



const Canvas: React.FC<CanvasProps> = ({setPrediction}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        
        if (ctx) {
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing || !canvasRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.strokeStyle = '#ffffff'; // White color for the drawing
            ctx.lineCap = 'round'; 
            ctx.lineJoin = 'round';
            ctx.stroke();
        }
    };



    const endDrawing = () => {
        setIsDrawing(false);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };


    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = '#000000'; // Set background to black
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };


    useEffect(() => {
        initializeCanvas();
    }, []);

    const initializeCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }    };

    return (
        <div className="flex flex-col items-center">
            <canvas
                width={400}
                height={400}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="border border-black"
            >

            </canvas>
            <div className="mt-4">
                <button onClick={clearCanvas} className="mr-2 bg-gray-300 p-2 rounded">
                    Clear
                </button>
                <button className="mr-2 bg-gray-300 p-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Canvas;