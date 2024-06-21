import { LobbyData, Sender, Message } from "./dto";

export const fetchLobbyData = (lobbyId : string) : Promise<LobbyData> => {
    // TODO lol 
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(new LobbyData(
            [
                new Sender("ABCDEFG", "isaac", false), 
                new Sender("ABCDEFG", "micah", false), 
                new Sender("ABCDEFG", "kenny", true), 
                new Sender("ABCDEFG", "david", false), 
            ], 
            [
                new Message("ABCDEFG", "isaac", 1, "How's it going?", 1718804476), 
                new Message("ABCDEFG", "micah", 2, "Fantastic", 1718804491), 
            ], 
            "ABCDEFG"
        )), 500); 
    }); 
} 

export const serverCheckLobbyExists = (lobbyId : string) : Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 250);  
    });
}

export const serverPostMessage = (lobbyId : string, username : string, message : string) : Promise<LobbyData> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(new LobbyData(
            [
                new Sender("ABCDEFG", "isaac", false), 
                new Sender("ABCDEFG", "micah", false), 
                new Sender("ABCDEFG", "kenny", true), 
                new Sender("ABCDEFG", "david", false), 
            ], 
            [
                new Message("ABCDEFG", "isaac", 1, "How's it going?", 1718804476), 
                new Message("ABCDEFG", "micah", 2, "Fantastic", 1718804491), 
                new Message(lobbyId, username, 3, message, 1718804501),
            ], 
            "ABCDEFG")), 250)
    }); 
}

export const serverCreateLobby = () : Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("ABCDEFG"), 500); 
    })
}

export const serverEnterLobby = (username : string, lobbyId : string) : Promise<LobbyData> => {
    return fetchLobbyData(lobbyId); 
}
