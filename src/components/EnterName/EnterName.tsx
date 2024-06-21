import css from './EnterName.module.css'
import Logo from '../Logo/Logo';
import { FC, useState } from 'react';
import { EnterNameProps } from '../Interface/Props';

const EnterName : FC<EnterNameProps> = ( props ) => {
    const [ username, setUsername ] = useState('');

    const enterLobby = () => {
        props.enterLobby(username); 
        setUsername('');
    }

    const exit = () => {
        props.goBack(); 
        setUsername('');
    }

    return (<div className={css.container}>
        <Logo/>
        <input placeholder='Enter username' onChange={e => setUsername(e.target.value)} onKeyDown={e => {if (e.key === 'Enter') { enterLobby(); }}}></input>
        <p onClick={() => enterLobby()}>Continue</p>
        <p onClick={exit}>Back</p>
    </div>); 
}

export default EnterName; 
