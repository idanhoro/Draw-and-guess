import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './DrawingBoard.module.css'
import server from '../ServerInfo'
import { useNavigate } from 'react-router';

const DrawingBoard = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [data, setData] = useState([])
    const [chosenWord, setChosenWord] = useState('')
    const [sessionScore, setSessionScore] = useState(0)

    const [isSent, setIsSent] = useState(false)


    const navigate = useNavigate()
    var interval


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 255;
        canvas.height = 255;
        canvas.style.width = `225px`;
        canvas.style.height = `225px`;
        const context = canvas.getContext("2d")
        context.scale(10/9, 10/9)
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5
        contextRef.current = context;
        getChosenWord()
        getSessionScore()
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

    const finishDrawingTouch = (nativeEvent) => {
        contextRef.current.closePath();
    }
    // handlers
    const handleClear = () => {
        contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
        setData([]);
    }
    const handleSendingData = () => {
        Axios.post(`${server}/drawingBoard/sendData`,
            data,
            { headers: { "room-id": localStorage.getItem("RoomID") } })
            .then((res) => {
                setIsSent(true)
                checkIfRoundOver()
            }).catch((error) => {
                console.log(error)
            })
    }

    const checkIfRoundOver = () => {
        interval = setInterval(() => {
            Axios.get(`${server}/users/checkIfRoundOver`,
                { headers: { "room-id": localStorage.getItem("RoomID") } })
                .then((res) => {
                    if (res.data) {
                        clearInterval(interval);
                        navigate('/guess')
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }, 5000);
    }

    const getChosenWord = () => {
        Axios.get(`${server}/words/getChosenWord`,
            { headers: { "room-id": localStorage.getItem("RoomID") }})
            .then((res) => {
                setChosenWord(res.data.word)
            }).catch((error) => {
                console.log(error);
            })
    }

    const getSessionScore = () => {
        Axios.get(`${server}/users/getSessionScore`,
        { headers: { "room-id": localStorage.getItem("RoomID") }})
        .then((res) => {
                setSessionScore(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className={classes.board__container}>
            <h1>DrawingBoard</h1>
            <h2>The word you need to draw : {chosenWord}</h2>
            <h2>Session Score : {sessionScore}</h2>

            <canvas
                style={{ border: `1px solid #000` }}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={moveDrawing}
                onTouchStart={startDrawingTouch}
                onTouchMove={moveDrawingTouch}
                onTouchEnd={finishDrawingTouch}
                ref={canvasRef}
            />
            <br />
            <button onClick={handleClear} disabled={isSent}>Clear</button>
            <button onClick={handleSendingData} disabled={isSent}>Send</button>

        </div>
    )
}

export default DrawingBoard