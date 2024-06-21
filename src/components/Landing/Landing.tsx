import { FC } from 'react';
import css from './Landing.module.css'
import Logo from '../Logo/Logo'
import { LandingProps } from '../Interface/Props';
import { useState } from 'react';

const Landing : FC<LandingProps> = ( props ) => {
    const [ lobbyCode, setLobbyCode ] = useState(''); 

    return (
    <div className={css.container}>
        <Logo/>
        <div className={css.joinParent}>
            <input placeholder='Lobby code...' onChange={val => setLobbyCode(val.target.value)} onKeyDown={e => {if (e.key === 'Enter') { props.joinLobby(lobbyCode); }}}></input>
            <p onClick={() => props.joinLobby(lobbyCode)}>Join Lobby</p>
        </div>
        <small>or</small>
        <p onClick={props.createLobby}>Create Lobby</p>
    </div>
    ); 
}

export default Landing; 
