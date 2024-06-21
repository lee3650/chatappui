import css from './Home.module.css'
import { useState } from 'react'
import Landing from '../Landing/Landing'
import { ChatPageProps, EnterNameProps, LandingProps } from '../Interface/Props'
import Spinner from '../Spinner/Spinner'
import EnterName from '../EnterName/EnterName'
import { fetchLobbyData, serverCheckLobbyExists, serverCreateLobby, serverEnterLobby, serverPostMessage } from '../../model/api'
import { LobbyData } from '../../model/dto'
import ChatPage from '../ChatPage/ChatPage'
 
const Home = () => {
    const [ loading, setLoading ] = useState(false); 
    const [ lobbyData, setLobbyData ] = useState<LobbyData>(LobbyData.emptyData()); 
    const [ lobbyToJoin, setLobbyToJoin ] = useState(''); 
    const [ username, setUsername ] = useState(''); 

    const joinLobby = (code : string) => {
        setLoading(true); 
        serverCheckLobbyExists(code)
        .then(result => { 
            setLoading(false);
            if (result) {
                setLobbyToJoin(code); 
            }
        });
    }

    const createLobby = () => {
        setLoading(true); 
        serverCreateLobby()
        .then(result => {
            setLoading(false); 
            setLobbyToJoin(result); 
        })
    }

    const enterLobby = (username : string) => {
        setLoading(true); 
        serverEnterLobby(username, lobbyToJoin)
        .then(result => {
            setUsername(username); 
            setLoading(false);
            setLobbyData(result);
        })
    }

    const goBackFromName = () => {
        setLoading(false); 
        setLobbyData(LobbyData.emptyData());
        setUsername(''); 
        setLobbyToJoin('');
    }

    const refreshChat = () => {
        fetchLobbyData(lobbyData.id)
        .then(result => {
            setLobbyData(result); 
            /* We could play an SFX here if we want to */
        })
    }

    const sendMessage = (msg : string) => {
        serverPostMessage(lobbyData.id, username, msg)
        .then(result => setLobbyData(result));
    }

    return (loading ? (<div className={css.spinnerParent}><Spinner/></div>) : (lobbyToJoin === '' ? 
    <Landing {... new LandingProps(joinLobby, createLobby)}></Landing> : (LobbyData.isEmpty(lobbyData) ? 
    <EnterName {...new EnterNameProps(enterLobby, goBackFromName)}/> : <ChatPage {...new ChatPageProps(username, lobbyData, goBackFromName, refreshChat, sendMessage)}/>)))
}

export default Home
