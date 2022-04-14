import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import classes from './GuessingBoard.module.css'
import server from '../ServerInfo'
import { useNavigate } from 'react-router'

function GuessingBoard() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [isReady, setIsReady] = useState(false)
    const [submittedWord, setSubmittedWord] = useState('')
    const [data, setData] = useState([])
    const [sessionScore, setSessionScore] = useState(0)
    const [isViewing, setisViewing] = useState(false)

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
        requestData()
        getSessionScore()
    }, [])
    
    const requestData = async () => {
        if (isReady) {
            return
        }
        interval = setInterval(() => {
            Axios.get(`${server}/drawingBoard/getData`,
                { headers: { "room-id": localStorage.getItem("RoomID") } })
                .then((req) => {
                    console.log(req)
                    if (req.data.ready) {
                        setData(req.data.data);
                        setIsReady(true)
                        clearInterval(interval);
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }, 5000);
    }

    const draw = async () => {
        contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
        let previous = { time: data[0].time };
        setisViewing(true)
        data.forEach(async (element, i) => {
            setTimeout(() => {
                if (element.start) {
                    contextRef.current.closePath();
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(element.x, element.y);
                }
                else {
                    contextRef.current.lineTo(element.x, element.y);
                    contextRef.current.stroke();
                }
                if (i === data.length - 1) {
                    setisViewing(false)
                }
                previous = element
            }, (element.time - previous.time))
        });
    }
    const handleSubmit = () =>{
        Axios.post(`${server}/words/receivingSubmitWord`,
        {word:submittedWord},
        { headers: { "room-id": localStorage.getItem("RoomID") } })
        .then((res)=>{
            const {isMatch} = res.data
            if(isMatch){

                alert('Correct answer')
            }
            else{
                alert('Incorrect answer')
            }

            navigate('/wordChoosing')

        }).catch((error) =>{
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
        <div className={classes.guess__container}>
            <h1>Guessing</h1>
            <h2>Session Score : {sessionScore}</h2>
            <canvas
                style={{ border: `1px solid #000` }}
                ref={canvasRef}
            />
            {!isReady ? (<h2>Waiting for other player to draw</h2>) :
            (<div>
                <button onClick={draw} disabled={isViewing}>View drawing</button>
                <div className={classes.input__container}>
                    <label>Answer: </label>
                    <input className={classes.input} onChange={(event)=>{setSubmittedWord(event.target.value)}}></input>
                    <button className={classes.btn} onClick={handleSubmit} >Submit</button>
                </div>
            </div>)}
        </div>
    )
}

export default GuessingBoard