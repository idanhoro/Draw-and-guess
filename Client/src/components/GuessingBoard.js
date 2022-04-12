import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'

function GuessingBoard() {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isReady, setIsReady] = useState(false)

    const [data, setData] = useState([])
    var interval
    const requestData = async () => {
        if (isReady){
            return
        }
        interval = setInterval(() => {
            Axios.get('http://localhost:3008/drawingBoard/getData')
            .then((req)=>{
                console.log(req)
                if (req.data.ready){
                    setData(req.data.data);
                    setIsReady(true)
                    clearInterval(interval);
                }
            }).catch((error)=>{
                console.log(error)
            }) 
        }, 5000);
    }
    
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
        requestData()
    }, [])

    const draw = async () => {
        contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
        let previous = {time:data[0].time};
        data.forEach(async (element, i) => {
            setTimeout(() => {
                if (element.start){
                    contextRef.current.closePath();
                    contextRef.current.beginPath();
                    contextRef.current.moveTo(element.x, element.y);
                }
                else{
                    contextRef.current.lineTo(element.x, element.y);
                    contextRef.current.stroke();
                }
                previous = element
            },(element.time-previous.time))
        });
    }
  return (
    <div>
       <canvas
                style={{ border: `1px solid #000` }}
                ref={canvasRef}
            />
            <br/>
            <button onClick={draw} disabled={!isReady}>View drawing</button>
    </div>
    
  )
}

export default GuessingBoard