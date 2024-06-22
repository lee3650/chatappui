import css from './Home.module.css'
import { FC, useState } from 'react'
import Landing from '../Landing/Landing'
import { ChatPageProps, EnterNameProps, HomePageProps, LandingProps } from '../Interface/Props'
import Spinner from '../Spinner/Spinner'
import EnterName from '../EnterName/EnterName'
import { LobbyData } from '../../model/dto'
import ChatPage from '../ChatPage/ChatPage'
 
const Home : FC<HomePageProps> = (props) => {
    const [ loading, setLoading ] = useState(false); 
    const [ lobbyData, setLobbyData ] = useState<LobbyData>(LobbyData.emptyData()); 
    const [ lobbyToJoin, setLobbyToJoin ] = useState(''); 
    const [ username, setUsername ] = useState(''); 
    const [ nameError, setNameError ] = useState('');
    const [ lobbyError, setLobbyError ] = useState('');

    const api = props.api;

    const joinLobby = (code : string) => {
        if (code.length == 0)
        {
            setLobbyError('Please enter a lobby code');
            return; 
        }        

        setLoading(true); 
        api.serverCheckLobbyExists(code)
        .then(result => { 
            setLoading(false);
            if (result) {
                setLobbyToJoin(code); 
            }
        })
        .catch(error => {
            let errorMsg = error?.response?.data?.message; 
            if (errorMsg) {
                setLobbyError(errorMsg);
            }
            else {
                setLobbyError('An unknown error occurred');
            }
        });
    }

    const createLobby = () => {
        setLoading(true); 
        api.serverCreateLobby()
        .then(result => {
            setLoading(false); 
            setLobbyToJoin(result); 
        })
        .catch(error => {
            let errorMsg = error?.response?.data?.message; 
            if (errorMsg) {
                setLobbyError(errorMsg);
            }
            else {
                setLobbyError('An unknown error occurred');
            }
            setLoading(false);
        })
    }

    const enterLobby = (username : string) => {
        if (username.length == 0) 
        {
            setNameError('Please enter a name'); 
            return;
        }

        setLoading(true); 
        api.serverEnterLobby(username, lobbyToJoin)
        .then(result => {
            setUsername(username); 
            setLoading(false);
            setLobbyData(result);
        })
        .catch(error => {
            let errorMsg = error?.response?.data?.message; 
            if (errorMsg) {
                setNameError(errorMsg);
            }
            else {
                setNameError('An unknown error occurred');
            }
            setLoading(false); 
        })
    }

    const goBackFromName = () => {
        setLoading(false); 
        setLobbyData(LobbyData.emptyData());
        setUsername(''); 
        setLobbyToJoin('');
        setLobbyError('');
        setNameError('');
    }

    const refreshChat = () => {
        api.fetchLobbyData(lobbyData.id)
        .then(result => {
            console.log(`refreshed chat: ${JSON.stringify(lobbyData)}`)
            setLobbyData(result); 
            /* We could play an SFX here if we want to */
        })
    }

    const sendMessage = (msg : string) => {
        api.serverPostMessage(lobbyData.id, username, msg)
        .then(result => setLobbyData(result));
    }

    const updateTyping = (value : boolean) => {
        api.serverUpdateTyping(lobbyData.id, username, value); 
    }

    return (loading ? (<div className={css.spinnerParent}><Spinner/></div>) : (lobbyToJoin === '' ? 
    <Landing {... new LandingProps(joinLobby, createLobby, lobbyError)}></Landing> : (LobbyData.isEmpty(lobbyData) || username === '' ? 
    <EnterName {...new EnterNameProps(enterLobby, goBackFromName, nameError)}/> : <ChatPage {...new ChatPageProps(username, lobbyData, goBackFromName, refreshChat, 
        sendMessage, updateTyping)}/>)))
}

export default Home
