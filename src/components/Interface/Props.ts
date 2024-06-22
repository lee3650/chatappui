import { LobbyData } from "../../model/dto";

export class LandingProps {
    constructor(public joinLobby : (code : string) => void, public createLobby : () => void, public error : string) {

    }
}

export class EnterNameProps {
    constructor(public enterLobby : (username : string) => void, public goBack : () => void, public error : string) {

    }
}

export class ChatPageProps {
    constructor(public username : string, public lobbyState : LobbyData, public leaveLobby : () => void,
    public refreshData : () => void, public sendMessage : (val : string) => void, public updateTyping : (val : boolean) => void) {

    }
}

export interface ServerApi {
    fetchLobbyData(lobbyId : string) : Promise<LobbyData>; 
    serverCheckLobbyExists(lobbyId : string) : Promise<boolean>;
    serverPostMessage(lobbyId : string, username : string, message : string) : Promise<LobbyData>;
    serverCreateLobby() : Promise<string>;
    serverEnterLobby (username : string, lobbyId : string) : Promise<LobbyData>;
    serverUpdateTyping(lobbyId : string, username : string, value : boolean) : void;
} 

export class HomePageProps {
    constructor(public api : ServerApi) {}
}
