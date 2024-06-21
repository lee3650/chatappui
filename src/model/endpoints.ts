const BASE_URL = 'http://localhost:8080'
export const fetchUrl = (id : string) => `${BASE_URL}/lobby/${id}`
export const POST_MESSAGE_URL = BASE_URL + "/postMessage"
export const lobbyExistsUrl = (id : string) => `${BASE_URL}/lobbyExists/${id}`
export const CREATE_LOBBY_URL = BASE_URL + '/createLobby'
export const ENTER_LOBBY_URL = BASE_URL + '/enterLobby'
export const UPDATE_TYPING_URL = BASE_URL + '/updateTyping'
