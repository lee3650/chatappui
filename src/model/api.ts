import axios from "axios";
import { LobbyData, Sender, Message } from "./dto";
import { CREATE_LOBBY_URL, ENTER_LOBBY_URL, POST_MESSAGE_URL, UPDATE_TYPING_URL, fetchUrl, lobbyExistsUrl } from "./endpoints";
import { ServerApi } from "../components/Interface/Props";

export class BackendAPI implements ServerApi {
    getHeaders = () => {
        return {
            headers: {
                Accept: "application/json"
            }
        }
    }

    parseLobbyData = (data: LobbyData): LobbyData => {
        return data
    }

    public fetchLobbyData = (lobbyId: string): Promise<LobbyData> => {
        return axios.get(fetchUrl(lobbyId), this.getHeaders())
            .then(response => this.parseLobbyData(response.data));
    }

    public serverCheckLobbyExists = (lobbyId: string): Promise<boolean> => {
        return axios.get(lobbyExistsUrl(lobbyId), this.getHeaders())
            .then(response => response.data);
    }

    public serverPostMessage = (lobbyId: string, username: string, message: string): Promise<LobbyData> => {
        return axios.post(POST_MESSAGE_URL, new Message(lobbyId, username, 0, message, 0), this.getHeaders())
            .then(response => this.parseLobbyData(response.data));
    }

    public serverCreateLobby = (): Promise<string> => {
        return axios.post(CREATE_LOBBY_URL, {}, this.getHeaders())
            .then(response => response.data);
    }

    public serverEnterLobby = (username: string, lobbyId: string): Promise<LobbyData> => {
        return axios.post(ENTER_LOBBY_URL, new Sender(lobbyId, username, false), this.getHeaders())
            .then(response => this.parseLobbyData(response.data));
    }

    public serverUpdateTyping = (lobbyId: string, username: string, value: boolean) => {
        axios.post(UPDATE_TYPING_URL, new Sender(lobbyId, username, value), this.getHeaders())
    }
}
