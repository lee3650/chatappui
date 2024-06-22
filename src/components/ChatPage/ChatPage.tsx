import { FC, useEffect, useState } from "react";
import { ChatPageProps } from "../Interface/Props";
import css from './ChatPage.module.css'; 
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageBox from "./MessageBox";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const INTERVAL = 750; 

const ChatPage : FC<ChatPageProps> = ( props ) => {
    const typers = props.lobbyState.senders.map(v => v.isTyping && v.name !== props.username ? v.name : null).filter(v => v !== null); 

    const [message, setMessage] = useState(''); 

    useEffect(() => {
        const interval = setInterval(() => {
            props.refreshData(); 
        }, INTERVAL); 

        return () => { clearInterval(interval); }; 
    }, [])

    const sendMessage = () => {
        if (message.length > 0)
        {
            props.updateTyping(false); 
            props.sendMessage(message);
            setMessage('');
        }
    }

    const messageChanged = (msg : string) => {
        if (msg.length === 0) {
            // then we send a 'not typing' message
            props.updateTyping(false); 
        }
        else {
            if (message.length === 0) {
                props.updateTyping(true); 
            }
        }
        setMessage(msg); 
    }

    return (<div className={css.page}>
        <div className={css.container}>
            <div className={css.header}>
                <h1 onClick={() => navigator.clipboard.writeText(props.lobbyState.id)}>
                    <FontAwesomeIcon icon={faClipboard} className={css.clipboard}/>
                    LOBBY ID: {props.lobbyState.id}
                </h1>
                <p>Members: {props.lobbyState.senders.map(sender => sender.name).join(', ')}</p>
                <strong onClick={props.leaveLobby}>&lt;&lt; Leave lobby</strong>
            </div>
            <div className={css.messageBox}>
                {props.lobbyState.messages.sort((a, b) => a.timestamp - b.timestamp).map(v => <MessageBox {...v} key={v.messageId}></MessageBox>)}
            </div>
            <div className={css.spacer}>
            </div>
            <div className={css.footer}>
                <input placeholder="Enter your message..." value={message} onChange={e => messageChanged(e.target.value)} 
                onKeyDown={e => {if (e.key == 'Enter') {sendMessage()}}}></input>
                <div className={css.sendButton} onClick={sendMessage}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                </div>
                {
                    typers.length > 0 ? (<div className={css.typingIndicator}>
                <div className={css.loader}></div> {typers.join(', ')} {typers.length > 1 ? 'are' : 'is'} typing...
                </div>) : 
                (<></>)}
            </div>
        </div>
    </div>); 
}

export default ChatPage; 
