import React from 'react'

function Waiting() {
    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop:'80px'}}>Waiting</h1>
            <h2 style={{textAlign: 'center', marginTop:'80px'}}>Room ID: {localStorage.getItem('RoomID')}</h2>
            <lottie-player 
            src="https://assets2.lottiefiles.com/packages/lf20_lpxbl3en.json" 
            background="transparent" 
            speed="1" 
            style={{width: "500px", height: "500px",margin:'0 auto'}}
            loop autoplay
            ></lottie-player>
        </div>
    )
}

export default Waiting