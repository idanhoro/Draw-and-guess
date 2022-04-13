import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './DrawingBoard.module.css'

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
    // handlers
    const handleClear = () =>{
        contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
        setData([]);
    }
    const handleSendingData = () => {
        Axios.post('http://localhost:3008/drawingBoard/sendData',
         data,
         {headers:{"room-id":localStorage.getItem("RoomID")}})
        .then((res)=>{
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className={classes.board__container}>
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
            <br/>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSendingData}>Send</button>

        </div>
    )
}

export default DrawingBoard