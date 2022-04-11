import React, { useEffect, useState, useRef } from 'react'

const DrawingBoard = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

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
    // Mouse Listener
    const startDrawing = (nativeEvent) => {
        const { clientX, clientY } = nativeEvent;
        const offsetX = clientX - canvasRef.current.offsetLeft
        const offsetY = clientY - canvasRef.current.offsetTop
        contextRef.current.beginPath();
        setIsDrawing(true)
        let date = new Date()
        setData([...data, { x: offsetX, y: offsetY, start: true, time: date.getTime() }])
    }
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false)
    }
    const moveDrawing = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        let date = new Date()
        setData([...data, { x: offsetX, y: offsetY, start: false, time: date.getTime() }])
    }
    // Touch Listener
    const startDrawingTouch = (nativeEvent) => {
        const { clientX, clientY } = nativeEvent.changedTouches[0];
        const offsetX = clientX - canvasRef.current.offsetLeft
        const offsetY = clientY - canvasRef.current.offsetTop
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true)
        let date = new Date()
        setData([...data, { x: clientX, y: clientY, start: true, time: date.getTime() }])
    }
    const moveDrawingTouch = (nativeEvent) => {
        const { clientX, clientY } = nativeEvent.changedTouches[0];
        const offsetX = clientX - canvasRef.current.offsetLeft
        const offsetY = clientY - canvasRef.current.offsetTop
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        let date = new Date()
        setData([...data, { x: clientX, y: clientY, start: false, time: date.getTime() }])
    }

    const finishDrawingTouch = (nativeEvent) =>{
        contextRef.current.closePath();
    }
    
    return (
        <div>
            <h1>DrawingBoard</h1>

            <canvas
                style={{ border: `1px solid #000` }}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={moveDrawing}
                onTouchStart = {startDrawingTouch}
                onTouchMove = {moveDrawingTouch}
                onTouchEnd = {finishDrawingTouch}
                ref={canvasRef}
            />
            <button onClick={() => { console.log(data) }}>View data</button>

        </div>
    )
}

export default DrawingBoard