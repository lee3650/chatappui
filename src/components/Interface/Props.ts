import { LobbyData } from "../../model/dto";

export class LandingProps {
    constructor(public joinLobby : (code : string) => void, public createLobby : () => void) {

    }
}

export class EnterNameProps {
    constructor(public enterLobby : (username : string) => void, public goBack : () => void) {

    }
}

export class ChatPageProps {
    constructor(public username : string, public lobbyState : LobbyData, public leaveLobby : () => void,
    public refreshData : () => void, public sendMessage : (val : string) => void) {

    }
}
