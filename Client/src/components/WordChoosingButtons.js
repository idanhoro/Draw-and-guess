import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'

function WordChoosingButtons(){
    const [wordBank, setWordBank] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3008/Words/getRandomsWords')
            .then((req)=>{
                setWordBank(req.data)
                console.log(req.data)

            }).catch((error)=>{
                console.log(error)
            }) 
    },[])
    const sendWord = (event) =>{
        console.log(event.currentTarget.textContent)
        
    }
    return (
        <div>
            <h1>WordChoosing</h1>
            {wordBank.map((item)=>{
                return (<div><br/>
                <button onClick={sendWord}>{item}</button>
                </div>
                )
            })}
        </div>
    )

}
export default WordChoosingButtons