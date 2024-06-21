import css from './EnterName.module.css'
import Logo from '../Logo/Logo';
import { FC, useState } from 'react';
import { EnterNameProps } from '../Interface/Props';

const EnterName : FC<EnterNameProps> = ( props ) => {
    const [ username, setUsername ] = useState('');

    return (<div className={css.container}>
        <Logo/>
        <input placeholder='Enter username' onChange={e => setUsername(e.target.value)}></input>
        <p onClick={() => props.enterLobby(username)}>Continue</p>
        <p onClick={props.goBack}>Back</p>
    </div>); 
}

export default EnterName; 
