export class LobbyData {
    constructor(public senders : Sender[], public messages : Message[], public id : string) {

    }

    static emptyData() {
        return new LobbyData([], [], "NONE"); 
    }

    static isEmpty(input : LobbyData) {
        return input.id === "NONE"; 
    }
}

export class Sender {
    constructor(public lobbyId : string, public name : string, public isTyping : boolean) {

    }
}

export class Message {
    constructor(public lobbyId : string, public senderName : string, public messageId : number, public messageContent : string, public timestamp : number) {

    }

    static timeString(msg : Message) {
        const date = new Date(msg.timestamp * 1000); 
        // Get components of the date
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let month = date.getMonth() + 1; // Months are zero-based
        let day = date.getDate();
        let year = date.getFullYear();

        // Determine AM or PM
        let period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Pad minutes with leading zero if needed
        let minstr = minutes < 10 ? '0' + minutes : `${minutes}`;

        // Format the date as [H]H:MM [AM,PM] M/D/YYYY
        return `${month}/${day}/${year}, ${hours}:${minstr} ${period}`;
    }
}

export const MAX_MSG_LEN = 512; 
export const MAX_NAME_LEN = 32; 
