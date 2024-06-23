import { FC } from "react";
import { Message } from "../../model/dto";
import css from './MessageBox.module.css'

const MessageBox : FC<Message> = ( msg ) => {
    return (<div className={css.container}>
        <b>
            {msg.senderName} <span>{Message.timeString(msg)}</span>
        </b>
        <p>
            {msg.messageContent}
        </p>
    </div>)
}

export default MessageBox; 
