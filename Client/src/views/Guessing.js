import React, { useEffect, useState} from 'react'
import GuessingBoard from '../components/GuessingBoard'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import server from '../ServerInfo'
import classes from './Guessing.module.css'
import ExitButton from '../components/ExitButton'

const Guessing = () => {

  const navigate = useNavigate()

  const [sessionScore, setSessionScore] = useState(0)

  useEffect(() => {
    getSessionScore()
}, [])

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
    <div className={classes.guess__container}>
      <h1>Guessing</h1>
      <h2>Session Score : {sessionScore}</h2>
      <GuessingBoard />
      <ExitButton/>
    </div>
  )
}

export default Guessing