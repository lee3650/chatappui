import { ServerApi } from "../components/Interface/Props";
import { LobbyData, Message, Sender } from "./dto";

const TestData = new LobbyData([
    new Sender('abcdefg', 'kenny', true), 
    new Sender('abcdefg', 'david', false), 
    new Sender('abcdefg', 'isaac', true), 
    new Sender('abcdefg', 'micah', false), 
],
    [
        new Message('abcdefg', 'isaac', 0, 'hey there!', 1718892250),
        new Message('abcdefg', 'kenny', 1, "what's up?", 1718896779),
        new Message('abcdefg', 'micah', 2, 'chilling', 1718896779),
        new Message('abcdefg', 'david', 3, 'for real', 1718896779),
    ],
"abcdefg");

export class MockApi implements ServerApi {
    constructor () {

    }    

/* @ts-ignore */
    fetchLobbyData(lobbyId: string): Promise<LobbyData> {
/* @ts-ignore */
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(TestData), 150);
        });
    }

/* @ts-ignore */
    serverCheckLobbyExists(lobbyId: string): Promise<boolean> {
/* @ts-ignore */
        return new Promise((resolve, reject) => setTimeout(() => resolve(true), 250));
    }
/* @ts-ignore */
    serverPostMessage(lobbyId: string, username: string, message: string): Promise<LobbyData> {
/* @ts-ignore */
        return new Promise((resolve, reject) => setTimeout(() => resolve(TestData), 125));
    }
    serverCreateLobby(): Promise<string> {
/* @ts-ignore */
// {'response': {'data': {'message': 'Failed to create a lobby'}}}
        return new Promise((resolve, reject) => setTimeout(() => resolve("abcdefg"), 125));
    }
/* @ts-ignore */
    serverEnterLobby(username: string, lobbyId: string): Promise<LobbyData> {
/* @ts-ignore */ // {'response': {'data': {'message': 'Failed to join lobby'}}}
        return new Promise((resolve, reject) => setTimeout(() => resolve(TestData), 125));
    }
/* @ts-ignore */
    serverUpdateTyping(lobbyId: string, username: string, value: boolean): void {
    }
}
