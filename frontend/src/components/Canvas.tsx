"use client";

import React, { useRef, useState, useEffect } from 'react';

interface CanvasProps {
    setPrediction: (prediction: string | null) => void;
    setShowPredictionCard: (value: boolean) => void;
    setConfidence: (confidence: string | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({setPrediction, setShowPredictionCard, setConfidence}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);

    const white_color = '#ffffff';
    const black_color = '#000000';

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = black_color;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = white_color;
        
        for (let x = 0; x <= width; x += 10) {
            for (let y = 0; y <= height; y += 10) {
                ctx.fillRect(x,y, 1,1)
            }
        }

        

        // Draw dashed center lines
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.setLineDash([]);
        
    };


    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        
        if (ctx) {
            ctx.strokeStyle = white_color;
            ctx.lineWidth = 18;
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            setIsDrawing(true);
            setIsCanvasEmpty(false);
        }
        
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing || !canvasRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.strokeStyle = white_color;
            ctx.lineCap = 'round'; 
            ctx.lineJoin = 'round';
            ctx.stroke();
        }
    };



    const endDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setIsCanvasEmpty(true);
        }
    };


    const handleSubmit = async () => {
        if (isCanvasEmpty) {
            alert("Please draw something on the canvas before submitting.");
            return;
        }
        setIsCanvasEmpty(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (ctx){
            //draw black background under the current drawing 
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = black_color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }


        const dataURL = canvas.toDataURL('image/jpg');
        const base64Image = dataURL.split(',')[1];

        if (ctx){
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        try{
            const response = await fetch(
                '/api/predict',
                {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({image: base64Image}),
                });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPrediction(data.prediction);
            setConfidence(data.confidence);
            setShowPredictionCard(true);
        } catch(error){
            console.log(error);
        }
    };


    useEffect(() => {
        initializeCanvas();
    }, []);

    const initializeCanvas = () => {
        if (!bgCanvasRef.current) return;
        const bgCtx = bgCanvasRef.current.getContext('2d');
        if (bgCtx) {
            drawGrid(bgCtx, bgCanvasRef.current.width, bgCanvasRef.current.height);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <canvas
                    width={512}
                    height={512}
                    ref={bgCanvasRef}
                    className="absolute border border-black rounded-lg"
            />
            <canvas
                width={512}
                height={512}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                className="relative border border-black rounded-lg"
            />

            <div className="mt-4">
                <button onClick={clearCanvas} className="mr-2 bg-gray-300 p-2 hover:bg-gray-500 rounded">
                    Clear
                </button>
                <button onClick={handleSubmit} className="mr-2 bg-blue-500 hover:bg-blue-700 p-2 rounded">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Canvas;