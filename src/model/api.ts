import axios from "axios";
import { LobbyData, Sender, Message } from "./dto";
import { CREATE_LOBBY_URL, ENTER_LOBBY_URL, POST_MESSAGE_URL, UPDATE_TYPING_URL, fetchUrl, lobbyExistsUrl } from "./endpoints";

const getHeaders = () => {
    return {
        headers: {
            Accept: "application/json"
        }
    }
}

const parseLobbyData = (data : LobbyData) : LobbyData => {
    return data
}

export const fetchLobbyData = (lobbyId : string) : Promise<LobbyData> => {
    return axios.get(fetchUrl(lobbyId), getHeaders())
    .then(response => parseLobbyData(response.data));
} 

export const serverCheckLobbyExists = (lobbyId : string) : Promise<boolean> => {
    return axios.get(lobbyExistsUrl(lobbyId), getHeaders())
    .then(response => response.data);
}

export const serverPostMessage = (lobbyId : string, username : string, message : string) : Promise<LobbyData> => {
    return axios.post(POST_MESSAGE_URL, new Message(lobbyId, username, 0, message, 0), getHeaders())
    .then(response => parseLobbyData(response.data));
}

export const serverCreateLobby = () : Promise<string> => {
    return axios.post(CREATE_LOBBY_URL, {}, getHeaders())
    .then(response => response.data);
}

export const serverEnterLobby = (username : string, lobbyId : string) : Promise<LobbyData> => {
    return axios.post(ENTER_LOBBY_URL, new Sender(lobbyId, username, false), getHeaders())
    .then(response => parseLobbyData(response.data));
}

export const serverUpdateTyping = (lobbyId : string, username : string, value : boolean) => {
    axios.post(UPDATE_TYPING_URL, new Sender(lobbyId, username, value), getHeaders())
}
