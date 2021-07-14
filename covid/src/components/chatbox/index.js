import "./styles.css"
import React, {useEffect, useState } from 'react';

const BalloonBot = ({time, content}) =>{
    return(
        <div className="balloonSender shadow">
            <p className="msg-content">{content}</p>
            <p className="msg-time">{time}</p>
        </div>
    )
}
const BallonUser = ({time, content}) => {
    return(
        <div className="balloonReceiver shadow">
            <p className="msg-content">{content}</p>
            <p className="msg-time">{time}</p>
        </div>
    )
}

function ChatBox(){
    const [content, setContent] = useState('')
    const [listaMensagens, setListaMensagens]= useState([])
    const [listaReplys, setListaReplys] = useState([])
    const [added, setAdded] = useState(false)
    
    
    function createMessage( content){
        var today = new Date()
        var hour = today.getHours()
        var minute = today.getMinutes()
        var second = today.getSeconds()

        if(hour < 10) hour = '0' + today.getHours()
        if(minute < 10) minute = '0' + today.getMinutes()
        if(second < 10) second = '0' + today.getSeconds()
        
        setListaMensagens(oldArray => [...oldArray, {time:`${hour+ ':' + minute + ':' + second}`, 
        content:`${content}` }])
        setListaReplys(oldArray => [...oldArray, {time: `${hour+ ':' + minute + ':' + second}`, 
        content:"fala mano"}])
        
        console.log(`Mensagem: ${content} Hora: ${hour}`)
        
    }
    
    async function handleInput(event){
        event.preventDefault()
        console.log(event.target.value)
        setContent(event.target.value)
        
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        if(content.length === 0){
            console.log("mensagem muito curta")
        }
        else{
            createMessage( content) 
            console.log("nova mensagem criada")
            setAdded(true)
        }
    }
    
    function updateScroll(){
        let element = document.getElementById("chatbox");
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        if(added){
            updateScroll()
            setAdded(false)
        }
    })

    return(
        <div className = "div-chatbox shadow" >
            <div id="chatbox">
                {listaMensagens.map((mensagem , index )=> {
                    if(listaMensagens.length > 0){
                        return(
                            <div>
                            <BallonUser time={mensagem.time} content={mensagem.content}></BallonUser> 
                            <BalloonBot time={listaReplys[index].time} content={listaReplys[index].content}></BalloonBot>
                            
                            </div>
                            )
                        }
                    })}
            </div>
                <div className="textbox">
                    <form>
                        <textarea className="form-control" placeholder="Digite sua mensagem..." onChange={handleInput}></textarea>
                        <button className="btn btn-success " type="button" onClick={handleSubmit}>Enviar</button>
                    </form>
                </div>
        </div>
    )
}

export default ChatBox