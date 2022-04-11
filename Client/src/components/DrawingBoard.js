import React, { useEffect, useState, useRef } from 'react'

const DrawingBoard = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const drawing = {
        data: []
    }
    const [data, setData] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth * 0.5}px`;
        canvas.style.height = `${window.innerHeight * 0.5}px`;

        const context = canvas.getContext("2d")
        context.scale(2, 2)
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5

        contextRef.current = context;

    }, [])
    const startDrawingTouch = (nativeEvent) => {
        console.log("Start drawing touch");
    }
    const moveDrawingTouch = (nativeEvent) => {
        console.log("Move drawing touch");
    }
    const startdrawing = (nativeEvent) => {
        const { offsetX, offsetY } = nativeEvent;
        const { clientX, clientY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true)
        //console.log(`Start drawing at ${clientX}, ${clientY}`)
        let date = new Date()
        setData([...data, { x: clientX, y: clientY, start: true, time: date.getTime() }])
        console.log(nativeEvent)

    }
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false)
    }
    const moveDraw = ({ nativeEvent }) => {
        const { clientX, clientY } = nativeEvent;

        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        //console.log(`Drawing at ${clientX}, ${clientY}`)
        let date = new Date()
        setData([...data, { x: clientX, y: clientY, start: false, time: date.getTime() }])

    }
    function startup() {
        const el = document.getElementById('canvas');
        el.addEventListener('touchstart', startDrawingTouch);
        //el.addEventListener('touchend', handleEnd);
        //el.addEventListener('touchcancel', handleCancel);
        el.addEventListener('touchmove', moveDrawingTouch);
        console.log('Initialized.');
      }
      document.addEventListener("DOMContentLoaded", startup);

    return (
        <div>
            <h1>DrawingBoard</h1>

            <canvas
                style={{ border: `1px solid #000` }}
                onMouseDown={startdrawing}
                onMouseUp={finishDrawing}
                onMouseMove={moveDraw}
                ref={canvasRef}
            />
            <button onClick={() => { console.log(data) }}>kaki</button>

        </div>
    )
}

export default DrawingBoard