import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import DrawingBoard from '../components/DrawingBoard'
import Axios from 'axios'
import server from '../ServerInfo'
import classes from './Drawing.module.css'
import ExitButton from '../components/ExitButton'

const Drawing = () => {

  const navigate = useNavigate()

  const [chosenWord, setChosenWord] = useState('')
  const [sessionScore, setSessionScore] = useState(0)

  useEffect(() => {
    getChosenWord()
    getSessionScore()
  }, [])


  const getChosenWord = () => {
    Axios.get(`${server}/words/getChosenWord`,
      { headers: { "room-id": localStorage.getItem("RoomID") } })
      .then((res) => {
        setChosenWord(res.data.word)
      }).catch((error) => {
        console.log(error);
      })
  }

  const getSessionScore = () => {
    Axios.get(`${server}/users/getSessionScore`,
      { headers: { "room-id": localStorage.getItem("RoomID") } })
      .then((res) => {
        setSessionScore(res.data)
      }).catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className={classes.draw__container}>
      <h1 style={{marginTop:'20px', marginBottom:'20px'}}>Drawing Board</h1>
      <h2>The word you need to draw : {chosenWord}</h2>
      <h2>Session Score : {sessionScore}</h2>
      <DrawingBoard />
      <ExitButton/>

    </div>
  )
}

export default Drawing